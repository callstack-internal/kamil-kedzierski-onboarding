package com.locationinfopackage

import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.os.Build

import android.content.Context
import android.location.Location
import android.location.LocationManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import androidx.core.content.ContextCompat
import android.Manifest
import com.facebook.react.bridge.Arguments
import android.util.Log


/**
 * Native module's shared implementation
 */
class LocationInfoModuleImpl(
    private val reactContext: ReactApplicationContext
) {
    fun getAppBuildNumber(): String {
        var buildNumber = "unknown"
        try {
            buildNumber = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                getPackageInfo().longVersionCode.toString()
            } else {
                @Suppress("DEPRECATION")
                getPackageInfo().versionCode.toString()
            }
        } catch (_: Exception) {}
        return buildNumber
    }

    fun getAppBundleId() = reactContext.packageName as String

    fun getAppVersion(): String {
        var appVersion = "unknown"
        try {
            appVersion = getPackageInfo().versionName
        } catch (_: Exception) {}
        return appVersion
    }

    private fun getPackageInfo(): PackageInfo {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            reactContext
                .packageManager
                .getPackageInfo(
                    reactContext.packageName,
                    PackageManager.PackageInfoFlags.of(0L)
                )
        } else {
            @Suppress("DEPRECATION")
            reactContext
                .packageManager
                .getPackageInfo(reactContext.packageName, 0)
        }
    }

    fun getCurrentLocation(promise: Promise) {
        if (ContextCompat.checkSelfPermission(reactContext, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            promise.reject("PERMISSION_DENIED", "Location permission not granted")
        } else {
            val locationManager = reactContext.getSystemService(Context.LOCATION_SERVICE) as LocationManager
            val providers = listOf(LocationManager.GPS_PROVIDER, LocationManager.NETWORK_PROVIDER, LocationManager.PASSIVE_PROVIDER)
            var location: Location? = null

            for (provider in providers) {
                try {
                    location = locationManager.getLastKnownLocation(provider)
                    if (location != null) break
                } catch (e: SecurityException) {
                    Log.e("LocationInfoModule", e)
                }
            }

            if (location != null) {
                val result = Arguments.createMap() 
                result.putDouble("latitude", location.latitude)
                result.putDouble("longitude", location.longitude)
                promise.resolve(result) 
            } else {
                // No location found with any provider
                promise.reject("LOCATION_ERROR", "Unable to retrieve location.")
            }
        }
    }   


    companion object {
        const val NAME = "LocationInfoModule"
    }
}