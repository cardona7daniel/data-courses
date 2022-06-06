import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { useQuery, useAuth } from "../../hooks";
import { getContentsByCourseApi, saveContentByCourseApi } from "../../api/content";
import { BasicTable } from "../../components/table";
import { Btn } from "../../components/button";
import Layout from "../../components/layout";
import Snackbar from '../../components/snackbar';
import Backdrop from '../../components/backdrop';

const headerData = [
  {
    title: "Contenido",
  },
];

const alertConf = {
  success: 'El contenido ha sido guardado existosamente!',
  error: 'Ha ocurrido un error guardando el contenido, por favor intente de nuevo!',
};

const Title = styled.p`
  font-size: 20px;
  margin: 0;
`;

export function ContentPage() {
  const { user = null } = useAuth();
  const query = useQuery();
  const navigate = useNavigate();
  const id = query.get("id");
  const course = query.get("course");
  const teacher = query.get("teacher");
  const teacherId = query.get("teacherId");
  const [content, setContent] = useState(null);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');

  const [showBackdrop, setShowBackdrop] = useState(false);
  const [registerState, setRegisterState] = useState('success');
  const [showRegisterAlert, setShowRegisterAlert] = useState(false);

  useEffect(() => {
    if (user && id && !content) {
      getContentsByCourseApi(id, {
        headers: {
          Authorization: "Bearer " + user?.access_token,
        },
      }).then((response) => {
        setContent(response.data);
      });
    }
  }, [id, user, content]);

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const alertWasClosed = () => {
    setShowRegisterAlert(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetForm = () => {
    setDescription('');
  };

  const handleSave = () => {
    setOpen(false);
    setShowBackdrop(true);
    saveContentByCourseApi({description, courseId: +id}, {
      headers: {
        Authorization: "Bearer " + user?.access_token,
      },
    })
      .then(() => {
        setShowRegisterAlert(true);
        setRegisterState('success');
        getContentsByCourseApi(id, {
          headers: {
            Authorization: "Bearer " + user?.access_token,
          },
        }).then((response) => {
          setContent(response.data);
        });
      })
      .catch(error => {
        setRegisterState('error');
      }).finally(() => {
        setShowBackdrop(false);
        setShowRegisterAlert(true);
        resetForm();
      })
  };

  const backToList = () => {
    navigate(`/course?username=${teacher}&id=${teacherId}`);
  };

  return (
    <>
      <Layout align="left" size="md">
        <Grid sx={{ mb: 4 }} container spacing={2}>
          <Grid item xs={8}>
            <Title>
              Listado de contenido del curso <b>{course}</b> con el profesor{" "}
              <b>{teacher}</b>
            </Title>
          </Grid>
          <Grid align="right" item xs={4}>
            <Btn onClick={handleClickOpen} variant="contained">
              Añadir Contenido
            </Btn>
          </Grid>
        </Grid>
        <Divider />
        <BasicTable headerData={headerData}>
          {content
            ? content.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.description}</TableCell>
                </TableRow>
              ))
            : null}
        </BasicTable>
        <Btn
          sx={{
            mt: 4,
          }}
          onClick={backToList}
          variant="outlined"
        >
          Regresar a lista de Cursos
        </Btn>
      </Layout>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Añadir contenido</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p><b>Usuario: </b> {user?.name}</p>
          </DialogContentText>
          <TextField
            sx={{
              width: '100%',
              minWidth: '500px'
            }}
            autoFocus
            margin="dense"
            id="content"
            label="Contenido"
            multiline
            maxRows={3}
            type="text"
            value={description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Btn onClick={handleClose}>Cancel</Btn>
          <Btn disabled={!description} variant="contained" onClick={handleSave}>Guardar</Btn>
        </DialogActions>
      </Dialog>
      <Snackbar type={registerState} open={showRegisterAlert} closed={alertWasClosed}>
        {alertConf[registerState]}
      </Snackbar>
      <Backdrop open={showBackdrop}></Backdrop>
    </>
  );
}
