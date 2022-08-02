import {
  Accordion, AccordionActions, AccordionDetails,
  AccordionSummary, Button, Divider, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@emotion/react';

export default function DocPriceAccordion({ type, content }) {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // colors
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const neutral = theme.palette.neutral.main;

  // edit state control
  const [edit, setEdit] = useState({
    [type]: false,
  });
  const editButtonHandler = (e) => {
    setEdit({ [type]: true });
  };
  const cancelButtonHandler = (e) => {
    setEdit({ [type]: false });
  };
  const saveButtonHandler = (e) => {
    // updates user.type state
    setEdit({ ...edit, [type]: false });
  };

  const rows = [
    { id: 1, service: 'lol', price: 3000 },
    { id: 2, service: 'lpppl', price: 2000 },
    { id: 1, service: 'lol', price: 3000 },
  ];

  return (
    <Accordion
      expanded={expanded === type}
      onChange={handleChange(type)}
      sx={!expanded ? {
        backgroundColor: neutral, p: 2, m: '.5rem', borderRadius: '9px',
      } : {
        backgroundColor: 'white', p: 2, m: '.5rem', borderRadius: '9px', border: `.5px solid ${primary}`,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{ height: '4rem' }}
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>
          Прайс-лист
        </Typography>
      </AccordionSummary>
      <Divider />
      {edit[type] ? (
        <>
          <AccordionDetails sx={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}
          >
            <TextField id="outlined-basic" variant="outlined" value={content || ''} sx={{ width: '100%', backgroundColor: 'white' }} />
          </AccordionDetails>
          <AccordionActions>
            <Button
              onClick={cancelButtonHandler}
              size="small"
              sx={{
                backgroundColor: neutral,
                color: 'black',
                border: `.5px solid ${secondary}`,
                borderRadius: '9px',
                p: '0.5rem',
                ml: 2,
              }}
            >
              Отмена
            </Button>
            <Button
              onClick={saveButtonHandler}
              size="small"
              sx={{
                backgroundColor: primary, color: 'black', borderRadius: '9px', p: '0.5rem', ml: 2,
              }}
            >
              Сохранить
            </Button>
          </AccordionActions>
        </>

      ) : (
        <AccordionDetails sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, maxHeight: '30vh',
        }}
        >
          {content ? (
            <TableContainer
              component={Paper}
              sx={{
                width: '85%', maxHeight: '30vh', borderRadius: '9px', backgroundColor: neutral,
              }}
            >
              <Table stickyHeader sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Услуга</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Цена</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {content.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.service}
                      </TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : 'Информация отсутствует'}
          <AccordionActions>
            <Button
              onClick={editButtonHandler}
              size="small"
              sx={{
                backgroundColor: primary, color: 'black', borderRadius: '9px', p: '0.5rem',
              }}
            >
              Редактировать
            </Button>
          </AccordionActions>
        </AccordionDetails>
      )}
    </Accordion>
  );
}
