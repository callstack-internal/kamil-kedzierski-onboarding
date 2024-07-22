package com.locationinfopackage

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.Promise
/**
 * Declare Kotlin class for old arch native module implementation
 *
 * Each native module extends ReactContextBaseJavaModule class
 *
 * Class should be annotated with @ReactModule decorator
 */
@ReactModule(name = LocationInfoModule.NAME)
class LocationInfoModule(
    // Each native module class consumes react application context
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
    // Use shared module implementation and forward react application context
    private val moduleImpl = LocationInfoModuleImpl(reactContext)

    // Return the name of the module - it should match the name provided in JS specification
    override fun getName() = NAME

    @ReactMethod
    fun getCurrentLocation(promise: Promise) {
        moduleImpl.getCurrentLocation(promise)
    }

    companion object {
        const val NAME = LocationInfoModuleImpl.NAME
    }
}