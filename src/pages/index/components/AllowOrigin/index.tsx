import { useAllowOrigins } from "../../../../atoms/AllowOrigins.ts";
import { Box, FormControlLabel, Switch, Typography } from "@material-ui/core";
import { useTabUrl } from "../../../../hooks/useTabUrl.ts";
import { useMatchedAllowedOrigin } from "../../../../hooks/useMatchedAllowedOrigin.ts";

const AllowOrigin = () => {
  const { addAllowOrigin, deleteAllowedOrigin } = useAllowOrigins();
  const { tabUrl, error: tabUrlError } = useTabUrl();
  const { isAllowed } = useMatchedAllowedOrigin({ tabUrl });
  if (tabUrlError)
    return <Typography color={"error"}>{tabUrlError}</Typography>;
  if (!tabUrl) return null;

  return (
    <Box>
      {isAllowed ? (
        <Typography>現在このページでの実行が許可されています。</Typography>
      ) : (
        <Typography>現在のページでは実行を許可されていません。</Typography>
      )}
      <FormControlLabel
        control={
          <Switch
            size={"small"}
            checked={!!isAllowed}
            onChange={(_, checked) => {
              if (checked) addAllowOrigin(tabUrl);
              else deleteAllowedOrigin(tabUrl);
            }}
            color="primary"
          />
        }
        label="実行許可"
      />
    </Box>
  );
};
export default AllowOrigin;
