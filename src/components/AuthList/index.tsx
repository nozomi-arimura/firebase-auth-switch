import { Auth } from "../../atoms/authList.ts";
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
type AuthListProps = {
  authList: Auth[];
  onSignin: (auth: Auth) => unknown;
  onRemove?: (auth: Auth) => unknown;
};
export const AuthList = ({ authList, onSignin, onRemove }: AuthListProps) => {
  return (
    <List component={"nav"}>
      {authList.map((auth) => (
        <ListItem
          key={auth.email}
          button
          alignItems={"flex-start"}
          onClick={() => onSignin(auth)}
        >
          <ListItemText
            primary={auth.description}
            secondary={
              auth.email !== auth.description ? (
                <Typography color={"textPrimary"}>{auth.email}</Typography>
              ) : undefined
            }
          />
          {onRemove && (
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onRemove(auth)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      ))}
    </List>
  );
};
