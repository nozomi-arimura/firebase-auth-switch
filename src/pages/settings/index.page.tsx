import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@material-ui/core";
import { useMatchedOriginSetting } from "../../hooks/useMatchedOriginSetting.ts";
import { useTabUrl } from "../../hooks/useTabUrl.ts";
import { FirebaseProjectForm } from "../../components/FirebaseProjectForm";
import { useOriginSettings } from "../../atoms/originSettings.ts";
import { useFirebaseSettings } from "../../atoms/FirebaseSettings.ts";

const Page = () => {
  const { tabUrl } = useTabUrl();
  const { matchedOriginSettings } = useMatchedOriginSetting({ tabUrl });
  const { addFirebaseConfig } = useOriginSettings();
  const { updateFirebaseSettings } = useFirebaseSettings();

  if (!matchedOriginSettings || !tabUrl) return null;
  return (
    <Box>
      <Accordion>
        <AccordionSummary>
          現在のURLにFirebaseプロジェクト設定を追加する
        </AccordionSummary>
        <AccordionDetails>
          <FirebaseProjectForm
            withMatchingPattern={false}
            tabUrl={tabUrl}
            onSubmit={({ matcher: _, ...firebaseSetting }) => {
              addFirebaseConfig(matchedOriginSettings.matcher, {
                ...firebaseSetting,
                selected: false,
              });
              updateFirebaseSettings(firebaseSetting);
            }}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default Page;
