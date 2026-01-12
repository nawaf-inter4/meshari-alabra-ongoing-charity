import WidgetKit
import SwiftUI

struct PrayerTimesWidget: Widget {
    let kind: String = "PrayerTimesWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: PrayerTimesProvider()) { entry in
            PrayerTimesWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Prayer Times")
        .description("Shows current and next prayer times")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
    }
}

struct PrayerTimesProvider: TimelineProvider {
    func placeholder(in context: Context) -> PrayerTimesEntry {
        PrayerTimesEntry(date: Date(), prayers: [
            Prayer(name: "Fajr", time: "05:30", isNext: false),
            Prayer(name: "Dhuhr", time: "12:15", isNext: true),
            Prayer(name: "Asr", time: "15:45", isNext: false),
            Prayer(name: "Maghrib", time: "18:20", isNext: false),
            Prayer(name: "Isha", time: "19:45", isNext: false)
        ])
    }

    func getSnapshot(in context: Context, completion: @escaping (PrayerTimesEntry) -> ()) {
        let entry = placeholder(in: context)
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [PrayerTimesEntry] = []
        let currentDate = Date()
        
        // Generate timeline entries for next 24 hours
        for hourOffset in 0..<24 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            // Fetch prayer times for this date
            let prayers = fetchPrayerTimes(for: entryDate)
            entries.append(PrayerTimesEntry(date: entryDate, prayers: prayers))
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
    
    func fetchPrayerTimes(for date: Date) -> [Prayer] {
        // This would call your API to get prayer times
        // For now, return placeholder data
        return [
            Prayer(name: "Fajr", time: "05:30", isNext: false),
            Prayer(name: "Dhuhr", time: "12:15", isNext: true),
            Prayer(name: "Asr", time: "15:45", isNext: false),
            Prayer(name: "Maghrib", time: "18:20", isNext: false),
            Prayer(name: "Isha", time: "19:45", isNext: false)
        ]
    }
}

struct PrayerTimesEntry: TimelineEntry {
    let date: Date
    let prayers: [Prayer]
}

struct Prayer {
    let name: String
    let time: String
    let isNext: Bool
}

struct PrayerTimesWidgetEntryView: View {
    var entry: PrayerTimesProvider.Entry

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Prayer Times")
                .font(.headline)
                .foregroundColor(.primary)
            
            ForEach(entry.prayers.prefix(3)) { prayer in
                HStack {
                    Text(prayer.name)
                        .font(.subheadline)
                    Spacer()
                    Text(prayer.time)
                        .font(.subheadline)
                        .foregroundColor(prayer.isNext ? .orange : .secondary)
                }
            }
        }
        .padding()
    }
}

@main
struct PrayerTimesWidgetBundle: WidgetBundle {
    var body: some Widget {
        PrayerTimesWidget()
    }
}
