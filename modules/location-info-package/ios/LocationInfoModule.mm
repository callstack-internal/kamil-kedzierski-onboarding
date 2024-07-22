#import <CoreLocation/CoreLocation.h>
#import "LocationInfoModule.h"
/**
 * When using Swift classes in ObjC implementation, the classes must be imported
 * from generated Objective-C Interface Header
 *
 * @see https://developer.apple.com/documentation/swift/importing-swift-into-objective-c#Import-Code-Within-an-Location-Target
 */
#import "LocationInfoPackage-Swift.h"

#if RCT_NEW_ARCH_ENABLED
/**
 * Import header file with codegenerated protocols based on the JS specification
 *
 * The name of the header matches the name provided in codegenConfig's `name` field in package.json
 */
#import "LocationInfoPackage.h"

/**
 * Each turbo module implements codegenerated spec protocol
 */
@interface LocationInfoModule () <NativeLocationInfoModuleSpec>
@end
#endif

/**
 * Declare the ObjC implementation for that native module class
 */
@implementation LocationInfoModule{
    LocationInfoModuleImpl *moduleImpl;
}

// Exported methods are overriden - based on the spec class
RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, getAppBuildNumber)
{
    return [moduleImpl getAppBuildNumber];
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, getAppBundleId)
{
    return [moduleImpl getAppBundleId];
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, getAppVersion)
{
    return [moduleImpl getAppVersion];
}

RCT_EXPORT_METHOD(getCurrentLocation:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  [moduleImpl getCurrentLocationWithSuccess:^(CLLocation *location) {
    NSDictionary *locationDict = @{@"latitude": @(location.coordinate.latitude),
                                   @"longitude": @(location.coordinate.longitude)};
    resolve(locationDict);
} failure:^(NSError *error) {
    reject(@"no_location", @"Could not fetch location", error);
}];
}

- (instancetype)init {
    self = [super init];
    if (self) {
        moduleImpl = [[LocationInfoModuleImpl alloc] init];
    }
    return self;
}
/**
 * Return the name of the module - it should match the name provided in JS specification
 */
RCT_EXPORT_MODULE(LocationInfoModule)

+ (BOOL)requiresMainQueueSetup {
    return NO;
}
#if RCT_NEW_ARCH_ENABLED
// Implement RCTTurboModule protocol
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeLocationInfoModuleSpecJSI>(params);
}
#endif

@end