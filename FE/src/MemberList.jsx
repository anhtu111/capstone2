import React from "react";
import { List, Datagrid, TextField } from "react-admin";

const MemberList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" />
      <TextField source="phone" />
      <TextField source="age" />
      <TextField source="gender" />
    </Datagrid>
  </List>
);

export default MemberList;
