import { useActitoConfiguration } from "@/actito/hooks/actito-configuration";
import { Card, CardContent, CardHeader } from "@/components/card";

export function ApplicationKeysSettingsCard() {
  const { appConfiguration } = useActitoConfiguration();

  return (
    <Card>
      <CardHeader title="Application keys" />

      <CardContent>
        <div>
          <p className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-1">
            Application Key
          </p>
          <p className="text-sm font-mono lowercase text-gray-400 break-words">
            {appConfiguration?.applicationKey}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-1">
            Application Secret
          </p>
          <p className="text-sm font-mono lowercase text-gray-400 break-words">
            {appConfiguration?.applicationSecret}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
