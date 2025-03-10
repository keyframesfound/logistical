import SwiftUI

struct ProfileView: View {
    var body: some View {
        VStack {
            Text("Profile Screen")
                .font(.title)
                .padding()
        }
        .navigationTitle("Profile")
    }
}

struct ProfileView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileView()
    }
}