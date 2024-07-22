package com.locationinfopackage

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

/**
 * Declare Kotlin class for new arch native module implementation
 *
 * Each turbo module extends codegenerated spec class
 *
 * Class should be annotated with @ReactModule decorator
 */
@ReactModule(name = LocationInfoModule.NAME)
class LocationInfoModule(
    // Each native module class consumes react application context
    reactContext: ReactApplicationContext
) : NativeLocationInfoModuleSpec(reactContext) {
    // Use shared module implementation and forward react application context
    private val moduleImpl = LocationInfoModuleImpl(reactContext)

    // Return the name of the module - it should match the name provided in JS specification
    override fun getName() = NAME

    override fun getCurrentLocation(promise: Promise) {
        moduleImpl.getCurrentLocation(promise)
    }

    companion object {
        const val NAME = LocationInfoModuleImpl.NAME
    }
}