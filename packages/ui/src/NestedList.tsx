import * as React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import CelebrationIcon from '@mui/icons-material/Celebration';

// 类型定义
type MenuItem = {
  key: React.Key;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: MenuItem[];
};

// 菜单数据
const menuData: MenuItem[] = [
  {
    key: 1,
    label: 'コンテンツ管理',
    icon: <MailOutlineIcon fontSize="small" />
  },
  {
    key: 2,
    label: '編集管理',
    disabled: false,
    icon: <CelebrationIcon fontSize="small" />
  },
  {
    key: 3,
    label: '設定管理',
    icon: <SettingsIcon fontSize="small" />,
    children: [
      { key: 4, label: 'Drafts', disabled: true },
      {
        key: 5,
        label: 'Starred',
        children: [
          { key: 6, label: 'Sub Star 1' },
          { key: 7, label: 'Sub Star 2' }
        ]
      }
    ]
  }
];

// 工具函数：查找路径
function findTreeKeys(tree: MenuItem[], key: React.Key): React.Key[] {
  for (const node of tree) {
    if (node.key === key) return [node.key];
    if (node.children) {
      const path = findTreeKeys(node.children, key);
      if (path.length) return [node.key, ...path];
    }
  }
  return [];
}

// 组件参数类型
type RenderMenuProps = {
  rootMenus: MenuItem[];
  menus: MenuItem[];
  depth?: number;
  selectedKeys: React.Key[];
  setSelectedKeys: (keys: React.Key[]) => void;
  openedKeys: Record<string, boolean>;
  setOpenedKeys: (keys: Record<string, boolean>) => void;
};

const AnimatedExpandIcon = styled(ExpandMoreIcon)<{ open: boolean }>(({ open }) => ({
  transition: 'transform 0.3s ease',
  transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
}));
// 递归菜单组件
const RenderMenu: React.FC<RenderMenuProps> = ({
  rootMenus,
  menus,
  depth = 0,
  selectedKeys,
  setSelectedKeys,
  openedKeys,
  setOpenedKeys
}) => {
  const handleToggle = (key: React.Key) => {
    setOpenedKeys({ ...openedKeys, [String(key)]: !openedKeys[String(key)] });
  };

  return (
    <List component="div" disablePadding>
      {menus.map((item) => {
        const hasChildren = !!item.children?.length;
        const isOpen = openedKeys[String(item.key)] ?? false;
        const isSelected = selectedKeys.includes(item.key);

        return (
          <React.Fragment key={item.key}>
            <ListItemButton
              onClick={() => {
                if (!hasChildren) setSelectedKeys(findTreeKeys(rootMenus, item.key));
                if (!item.disabled && hasChildren) handleToggle(item.key);
              }}
              sx={{
                pl: 2 + depth * 2,
                ...(item.disabled && {
                  color: 'gray',
                  opacity: 0.5,
                  pointerEvents: 'none'
                })
              }}
              selected={!hasChildren && isSelected}
            >
              {item.icon && (
                <ListItemIcon sx={{ color: isSelected ? '#1677ff' : 'black', minWidth: 30 }}>
                  {item.icon}
                </ListItemIcon>
              )}
              <ListItemText
                primary={item.label}
                sx={{ color: isSelected ? '#1677ff' : 'black', pr: 2 }}
              />
              {hasChildren && (
                <AnimatedExpandIcon
                  open={isOpen}
                  sx={{ color: isSelected ? '#1677ff' : 'black' }}
                />
              )}
            </ListItemButton>

            {hasChildren && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <RenderMenu
                  rootMenus={rootMenus}
                  menus={item.children!}
                  depth={depth + 2}
                  selectedKeys={selectedKeys}
                  setSelectedKeys={setSelectedKeys}
                  openedKeys={openedKeys}
                  setOpenedKeys={setOpenedKeys}
                />
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

// 主组件
export default function NestedList() {
  const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>([]);
  const [openedKeys, setOpenedKeys] = React.useState<Record<string, boolean>>({});

  return (
    <RenderMenu
      rootMenus={menuData}
      menus={menuData}
      selectedKeys={selectedKeys}
      setSelectedKeys={setSelectedKeys}
      openedKeys={openedKeys}
      setOpenedKeys={setOpenedKeys}
    />
  );
}
