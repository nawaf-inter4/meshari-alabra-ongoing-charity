package com.meshari.charity.widgets

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.widget.RemoteViews
import android.graphics.Color
import androidx.core.content.ContextCompat

class PrayerTimesWidget : AppWidgetProvider() {
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    override fun onEnabled(context: Context) {
        // Enter relevant functionality for when the first widget is created
    }

    override fun onDisabled(context: Context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}

internal fun updateAppWidget(
    context: Context,
    appWidgetManager: AppWidgetManager,
    appWidgetId: Int
) {
    val views = RemoteViews(context.packageName, R.layout.prayer_times_widget)
    
    // Set widget title
    views.setTextViewText(R.id.widget_title, "Prayer Times")
    
    // Fetch and display prayer times
    // This would typically fetch from SharedPreferences or API
    val prayers = listOf(
        "Fajr: 05:30",
        "Dhuhr: 12:15",
        "Asr: 15:45",
        "Maghrib: 18:20",
        "Isha: 19:45"
    )
    
    views.setTextViewText(R.id.prayer_1, prayers[0])
    views.setTextViewText(R.id.prayer_2, prayers[1])
    views.setTextViewText(R.id.prayer_3, prayers[2])
    views.setTextViewText(R.id.prayer_4, prayers[3])
    views.setTextViewText(R.id.prayer_5, prayers[4])
    
    // Set next prayer highlight
    views.setTextColor(R.id.prayer_2, Color.parseColor("#D4AF37"))
    
    // Instruct the widget manager to update the widget
    appWidgetManager.updateAppWidget(appWidgetId, views)
}
