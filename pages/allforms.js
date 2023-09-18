import React, { useEffect, useState } from 'react';
import{
    Card,
    CardContent,
    Typography,
    Button
} from '@mui/material'

export default function allforms(){
  const [forms, setForms] = useState([]);
  useEffect(() => {
    fetch('/api/getAllforms')
      .then((response) => response.json())
      .then((data) => setForms(data));
  }, []);
  console.log(forms)
  return (
    <div>
      <Typography variant="h3">Latest Forms</Typography>
      <div>
        {forms.map((form) => (
          <Card key={form.id} variant="outlined" sx={{marginBottom: '5px'}}>
            <CardContent>
              <Typography variant="h6">{form.title}</Typography>
              <Typography variant="body2">{form.description}</Typography>
              <Button
              variant="outlined"
              onClick={() => {
                function go() {
                  window.location.href = `http://localhost:3000/formView?id=${form.id}`;
                }
                go();
              }}
            >
              Payout: {form.a}
            </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};