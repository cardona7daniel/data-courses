import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import styled from "@emotion/styled";

import { useQuery, useAuth } from '../../hooks';
import { getCoursesByUserApi } from '../../api/course';
import { Btn } from '../../components/button';
import { BasicTable } from "../../components/table";

const headerData = [
  {
    title: "Nombre del curso",
  },
  {
    title: "",
    align: "right",
  },
];

const Title = styled.p`
  font-size: 20px;
`;

export function CoursePage() {
  const { user = null } = useAuth();
  const query = useQuery();
  const teacherId = query.get('id');
  const username = query.get('username');
  let navigate = useNavigate();
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    if (user && teacherId && !courses) {
      getCoursesByUserApi(teacherId, {
        headers: {
          Authorization: "Bearer " + user?.access_token,
        },
      }).then((response) => {
        setCourses(response.data);
      });
    }
  }, [teacherId, user, courses]);

  const couserDetail = (course) => {
    const { id, name } = course;
    navigate(`/content?course=${name}&id=${id}&teacher=${username}&teacherId=${teacherId}`)
  }

  const backToList = () => {
    navigate(`/`);
  };

  return (
    <Layout size="md" align="left">
      <Title>Listado de cursos del profesor <b>{username}</b></Title>
      <BasicTable headerData={headerData}>
        {courses ? courses.map((row) => (
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{row.name}</TableCell>
            <TableCell align="right">
              <IconButton onClick={() => couserDetail(row)}>
                <EditIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        )) : null}
      </BasicTable>
      <Btn sx={{
        mt: 4
      }} onClick={backToList} variant="outlined">Regresar a lista de Profesores</Btn>
    </Layout>
  );
}

