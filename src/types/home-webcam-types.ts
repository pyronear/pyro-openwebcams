export type IntegrationStatusCode = "INTEGRATED" | "EVALUATION" | "REJECTED";

export type CameraType = "PYRONEAR" | "COMMUNAUTAIRE";

export type HomeWebcam = {
  cameraType: CameraType;
  id: string;
  integrationStatus: {
    code: IntegrationStatusCode;
    labelKey: string;
  };
  latitude: number;
  longitude: number;
  name: string;
  url: string | null;
};
