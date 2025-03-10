import SwiftUI
import AVFoundation

struct QRCodeScannerView: UIViewControllerRepresentable {
    @EnvironmentObject var inventoryModel: InventoryModel
    
    func makeUIViewController(context: Context) -> ScannerViewController {
        let controller = ScannerViewController()
        controller.completion = { result in
            // Add item to inventory
            let newItem = InventoryItem(name: result, dateScanned: Date())
            DispatchQueue.main.async {
                inventoryModel.items.append(newItem)
            }
        }
        return controller
    }
    
    func updateUIViewController(_ uiViewController: ScannerViewController, context: Context) {
        // ...existing code...
    }
}

class ScannerViewController: UIViewController, AVCaptureMetadataOutputObjectsDelegate {
    var completion: ((String) -> Void)?
    var captureSession: AVCaptureSession!
    var previewLayer: AVCaptureVideoPreviewLayer!
    let restartButton = UIButton(type: .system)
    let instructionLabel = UILabel()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .black
        captureSession = AVCaptureSession()
        
        guard let videoCaptureDevice = AVCaptureDevice.default(for: .video) else { return }
        guard let videoInput = try? AVCaptureDeviceInput(device: videoCaptureDevice) else { return }
        if captureSession.canAddInput(videoInput) {
            captureSession.addInput(videoInput)
        } else {
            // ...existing code...
            return
        }
        
        let metadataOutput = AVCaptureMetadataOutput()
        if captureSession.canAddOutput(metadataOutput) {
            captureSession.addOutput(metadataOutput)
            metadataOutput.setMetadataObjectsDelegate(self, queue: DispatchQueue.main)
            metadataOutput.metadataObjectTypes = [.qr]
        } else {
            // ...existing code...
            return
        }
        
        previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        previewLayer.frame = view.layer.bounds
        previewLayer.videoGravity = .resizeAspectFill
        view.layer.addSublayer(previewLayer)
        
        // Add instruction overlay
        instructionLabel.text = "Align QR code within frame to scan"
        instructionLabel.textColor = .white
        instructionLabel.textAlignment = .center
        instructionLabel.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(instructionLabel)
        
        NSLayoutConstraint.activate([
            instructionLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 16),
            instructionLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor)
        ])
        
        // Add restart button overlay
        restartButton.setTitle("Restart Scan", for: .normal)
        restartButton.backgroundColor = UIColor(white: 0.1, alpha: 0.7)
        restartButton.setTitleColor(.white, for: .normal)
        restartButton.layer.cornerRadius = 8
        restartButton.translatesAutoresizingMaskIntoConstraints = false
        restartButton.addTarget(self, action: #selector(restartScanning), for: .touchUpInside)
        view.addSubview(restartButton)
        
        NSLayoutConstraint.activate([
            restartButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -16),
            restartButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            restartButton.widthAnchor.constraint(equalToConstant: 140),
            restartButton.heightAnchor.constraint(equalToConstant: 44)
        ])
        
        captureSession.startRunning()
    }
    
    @objc func restartScanning() {
        if !captureSession.isRunning {
            captureSession.startRunning()
        }
    }
    
    func metadataOutput(_ output: AVCaptureMetadataOutput,
                        didOutput metadataObjects: [AVMetadataObject],
                        from connection: AVCaptureConnection) {
        captureSession.stopRunning()
        if let metadataObject = metadataObjects.first,
           let readableObject = metadataObject as? AVMetadataMachineReadableCodeObject,
           let stringValue = readableObject.stringValue {
            AudioServicesPlaySystemSound(SystemSoundID(kSystemSoundID_Vibrate))
            completion?(stringValue)
        }
        dismiss(animated: true)
    }
    
    override var prefersStatusBarHidden: Bool { true }
    override var supportedInterfaceOrientations: UIInterfaceOrientationMask { .portrait }
}