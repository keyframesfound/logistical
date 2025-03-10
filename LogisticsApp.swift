import SwiftUI

@main
struct LogisticsApp: App {
    @State private var selectedTab = 0
    var body: some Scene {
        WindowGroup {
            VStack {
                TabView(selection: $selectedTab) {
                    QRCodeGenView()
                        .tag(0)
                        .tabItem {
                            Image(systemName: "qrcode")
                            Text("Generate")
                        }
                    QRScanView()
                        .tag(1)
                        .tabItem {
                            Image(systemName: "camera")
                            Text("Scan")
                        }
                    ItemsListView()
                        .tag(2)
                        .tabItem {
                            Image(systemName: "list.bullet")
                            Text("Items")
                        }
                    ProfileView()
                        .tag(3)
                        .tabItem {
                            Image(systemName: "person")
                            Text("Profile")
                        }
                }
                .frame(maxHeight: .infinity)
                HStack {
                    Spacer()
                    Image(systemName: "house")
                        .onTapGesture { selectedTab = 0 }
                    Spacer()
                    Image(systemName: "heart")
                        .onTapGesture { selectedTab = 1 }
                    Spacer()
                    Image(systemName: "message")
                        .onTapGesture { selectedTab = 2 }
                    Spacer()
                    Image(systemName: "person")
                        .onTapGesture { selectedTab = 3 }
                    Spacer()
                }
                .padding()
                .background(Color(UIColor.systemGray6))
            }
        }
    }
}
