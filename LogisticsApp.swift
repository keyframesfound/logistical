import SwiftUI

@main
struct LogisticsApp: App {
    var body: some Scene {
        WindowGroup {
            TabView {
                QRCodeGenView()
                    .tabItem {
                        Image(systemName: "qrcode")
                        Text("Generate")
                    }
                QRScanView()
                    .tabItem {
                        Image(systemName: "camera")
                        Text("Scan")
                    }
                ItemsListView()
                    .tabItem {
                        Image(systemName: "list.bullet")
                        Text("Items")
                    }
            }
        }
    }
}
