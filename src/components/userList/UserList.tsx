import { Table } from "@mantine/core";
import React from 'react'

export const UserList = ({data}) => {

    const rowsList = Array.from(new Set((data.map(item => Object.keys(item.data))).flat(1)))
    console.log(rowsList)

    const status = (status) => {
        if(status) return 'Active ✅'
        return 'Stoped by user ❌'
    }

    const top = (data) => {
        return (
            data.map((item, index) => <Table.Th>{item}</Table.Th>)
        )
    }

    const list = (data, element) => {
        return (
            data.map((item, index) => <Table.Td>{element.data[item] ? element.data[item] : ''}</Table.Td>)
        )
    }

    const rows = data.map((element, index) => (
        <Table.Tr key={index}>
          <Table.Td>{element._id}</Table.Td>
          <Table.Td>{status(element.activBots)}</Table.Td>
          {list(rowsList, element)}
        </Table.Tr>
      ))
    
      return (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>id</Table.Th>
              <Table.Th>Status</Table.Th>
              {top(rowsList)}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )

}