import Foundation
import CoreLocation

@objc(LocationInfoModuleImpl)
public class LocationInfoModuleImpl: NSObject, CLLocationManagerDelegate {
    private var locationManager: CLLocationManager = CLLocationManager()
    private var locationFetchCompletion: ((Result<CLLocation, Error>) -> Void)?
    private var hasCompletionBeenCalled: Bool = false

    @objc override public init() {
        super.init()
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
    }

    @objc public func getAppBuildNumber() -> String {
        return Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as? String ?? "Unknown"
    }

    @objc public func getAppBundleId() -> String {
        return Bundle.main.bundleIdentifier ?? "Unknown"
    }

    @objc public func getAppVersion() -> String {
        return Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "Unknown"
    }

    @objc public func getCurrentLocation(success: @escaping (CLLocation) -> Void, failure: @escaping (Error) -> Void) {
        hasCompletionBeenCalled = false
        locationFetchCompletion = { result in
            switch result {
            case .success(let location):
                success(location)
            case .failure(let error):
                failure(error)
            }
        }
        locationManager.requestWhenInUseAuthorization()
        locationManager.startUpdatingLocation()
    }

    public func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    guard !hasCompletionBeenCalled, let location = locations.last else { return }
    hasCompletionBeenCalled = true
    locationManager.stopUpdatingLocation()
    locationFetchCompletion?(.success(location))
    }

    public func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        guard !hasCompletionBeenCalled else { return }
        hasCompletionBeenCalled = true
        locationManager.stopUpdatingLocation()
        locationFetchCompletion?(.failure(error)) 
    }
}