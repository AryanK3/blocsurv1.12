import clientPromise from "../../lib/mongodb";

async function fetchResponsesByFormUUID(formUUID) {
    const client = await clientPromise;
    const db = client.db("responses");
    const responses = await db.collection(formUUID).find({}).toArray();

    const db2 = client.db("formupload");
    const formDocument = await db2.collection(formUUID).findOne({});
  
    const questionResponseMap = {};
  
    formDocument.groups.forEach(group => {
        const questionUUID = group.id;
        responses.forEach(response => {
            const matchingResponse = response[questionUUID];
            if (!questionResponseMap[questionUUID]) {
                questionResponseMap[questionUUID] = {
                    questionLabel: group.label,
                    responses: []
                };
            }
            questionResponseMap[questionUUID].responses.push(matchingResponse || '');
        });
    });
  
    return questionResponseMap;
}
function convertResponsesToCSV(responseMap) {
    const questionUUIDs = Object.keys(responseMap);
    const headerRow = `${questionUUIDs.map(uuid => responseMap[uuid].questionLabel).join(',')}\n`;
    const numRows = responseMap[questionUUIDs[0]].responses.length;
    const csvRows = [];

    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        const row = [];
        questionUUIDs.forEach(uuid => {
            const responses = responseMap[uuid].responses[rowIndex];
            if (Array.isArray(responses)) {
                row.push(`"${responses.join(', ')}"`); 
            } else {
                row.push(`"${responses}"`); 
            }
        });
        csvRows.push(row);
    }

    const csvContent = headerRow + csvRows.map(row => row.join(',')).join('\n');
    return csvContent;
}


export default async function handler(req, res) {
    try {
        const formUUID = req.query.formUUID;
        const responseMap = await fetchResponsesByFormUUID(formUUID); 
        const csvContent = convertResponsesToCSV(responseMap);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="${formUUID}_responses.csv"`);
        res.status(200).send(csvContent);
    } catch (error) {
        console.error('Error exporting responses:', error);
        res.status(500).send('Error exporting responses');
    }
}
