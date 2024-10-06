import { Menu, Button } from '@mantine/core';
import React, { useState } from 'react'

export function GroupListMenu({groups, setActivGroup, activGroup}) {

    const [opened, setOpened] = useState(false)

    const menuItems = groups.map((item, index) => 
        
            <Menu.Item
                key={index}
                onClick={() => {
                    setActivGroup(item)
                }}>
                {item.name}
            </Menu.Item>)

  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened} withArrow>
        <Menu.Target>
            <Button variant="default" size="xs" fullWidth disabled={!groups.length}>
                {`Groups (${groups.length})`}
            </Button>
        </Menu.Target>
        <Menu.Dropdown>
        <Menu.Item
            onClick={() => {
                setActivGroup([])
            }}>
            All users
        </Menu.Item>
            {menuItems}
        </Menu.Dropdown>
    </Menu>
  )
}