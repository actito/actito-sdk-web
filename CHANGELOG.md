# CHANGELOG

## 5.0.0-beta.3

- Improve how long content overflows in the push onboarding and in-app messages.
- Wait for the in-app message action event before executing the presenter

## 5.0.0-beta.2

- Prioritize the `launchConfig.applicationName` over the `application.name` for the Push Onboarding dialog and other Notification UI dialogs.
- Fixed an issue in the main package where the exports for the user-inbox module in `package.json` incorrectly referenced another path.
- Ensure the camera is properly switched off after closing the modal or taking a picture.
- Fixed the position of the launch floating button tooltip when the horizontal alignment was set to right and the vertical alignment to top.
- Allow multiple lines in the launch floating button tooltip.

## 5.0.0-beta.1

Prior to upgrading to v5.x, consult the [Migration Guide](./MIGRATION.md), which outlines all necessary changes and procedures to ensure a smooth migration.
