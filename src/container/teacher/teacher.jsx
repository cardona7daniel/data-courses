import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Rating from '@mui/material/Rating';
import styled from "@emotion/styled";

import { BasicTable } from "../../components/table";
import { useAuth } from "../../hooks";
import { getTeachersApi } from "../../api";

const headerData = [
  {
    title: "Username",
  },
  {
    title: "Email",
  },
  {
    title: "Puntuación",
  },
  {
    title: "",
    align: "right",
  },
];

const Title = styled.p`
  font-size: 20px;
`;

export const TeacherPage = () => {
  const { user = null } = useAuth();
  let navigate = useNavigate();
  const [teachers, setTeachers] = useState(null);
  useEffect(() => {
    if (user) {
      getTeachersApi({
        headers: {
          Authorization: "Bearer " + user?.access_token,
        },
      }).then((response) => {
        setTeachers(response.data);
      });
    }
  }, [user]);

  const teacherDetail = (course) => {
    const { id, username } = course;
    navigate(`/course?username=${username}&id=${id}`)
  }

  return (
    <Layout>
      <Title>Listado de profesores</Title>
      <BasicTable headerData={headerData}>
        {teachers ? teachers.map((row) => (
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{row.username}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>
              <Rating readOnly defaultValue={+row.score} precision={0.5} />
              </TableCell>
            <TableCell align="right">
              <IconButton onClick={() => teacherDetail(row)}>
                <EditIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        )) : null}
      </BasicTable>
    </Layout>
  );
};
