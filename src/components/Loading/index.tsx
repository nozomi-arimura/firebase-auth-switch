import styles from "./index.module.css";
import { LinearProgress } from "@material-ui/core";
export type LoadingProps = {
  isLoading: boolean;
};

export const Loading = ({ isLoading }: LoadingProps) => {
  return (
    <div
      className={`${styles.root} ${
        isLoading ? styles.visible : styles.invisible
      }`}
    >
      {isLoading && <LinearProgress />}
    </div>
  );
};
