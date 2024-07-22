import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  getAppBuildNumber(): string;
  getAppBundleId(): string;
  getAppVersion(): string;
  getCurrentLocation(): Promise<{latitude: number; longitude: number}>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('LocationInfoModule');
