# 🎨 TELEtoWA Mermaid Diagrams

## 📋 Table of Contents
- [System Architecture](#system-architecture)
- [Message Flow](#message-flow)
- [Error Recovery Process](#error-recovery-process)
- [Component Interaction](#component-interaction)
- [Deployment Flow](#deployment-flow)

---

## 🏗️ System Architecture

### 🇮🇩 Bahasa Indonesia
```mermaid
graph TB
    subgraph "TELEtoWA v1.1.0"
        subgraph "📡 Telegram API"
            TG[StringSession + gramJS]
        end
        
        subgraph "👤 User Telegram"
            UT[User Messages<br/>Media Files<br/>Private Chat]
        end
        
        subgraph "🔧 TELEtoWA Bridge"
            TB[Auto Forward<br/>Smart Reply<br/>Error Recovery<br/>Session Mgmt]
        end
        
        subgraph "👤 Admin WhatsApp"
            AW[Receive Notifications<br/>Send Commands<br/>Reply System]
        end
        
        subgraph "📱 WhatsApp API"
            WA[Baileys + Multi-file<br/>Auth State]
        end
    end
    
    UT <--> TB
    TB <--> AW
    TG --> TB
    TB --> WA
    
    style TB fill:#e1f5fe
    style TG fill:#f3e5f5
    style WA fill:#e8f5e8
    style UT fill:#fff3e0
    style AW fill:#fff3e0
```

### 🇺🇸 English
```mermaid
graph TB
    subgraph "TELEtoWA v1.1.0"
        subgraph "📡 Telegram API"
            TG[StringSession + gramJS]
        end
        
        subgraph "👤 User Telegram"
            UT[User Messages<br/>Media Files<br/>Private Chat]
        end
        
        subgraph "🔧 TELEtoWA Bridge"
            TB[Auto Forward<br/>Smart Reply<br/>Error Recovery<br/>Session Mgmt]
        end
        
        subgraph "👤 Admin WhatsApp"
            AW[Receive Notifications<br/>Send Commands<br/>Reply System]
        end
        
        subgraph "📱 WhatsApp API"
            WA[Baileys + Multi-file<br/>Auth State]
        end
    end
    
    UT <--> TB
    TB <--> AW
    TG --> TB
    TB --> WA
    
    style TB fill:#e1f5fe
    style TG fill:#f3e5f5
    style WA fill:#e8f5e8
    style UT fill:#fff3e0
    style AW fill:#fff3e0
```

---

## 🔄 Message Flow

### 🇮🇩 Bahasa Indonesia
```mermaid
sequenceDiagram
    participant U as 👤 User Telegram
    participant T as 📡 Telegram Client
    participant B as 🔧 TELEtoWA Bridge
    participant W as 📱 WhatsApp Client
    participant A as 👤 Admin WhatsApp
    
    U->>T: 1. Kirim Pesan "Halo Admin"
    T->>B: 2. Terima Pesan (Event Handler)
    B->>W: 3. Proses & Forward
    W->>A: 4. Kirim Notifikasi ke Admin
    A->>W: 5. Admin Reply "/reply @user OK"
    W->>B: 6. Proses Command
    B->>T: 7. Parse Command & Kirim Reply
    T->>U: 8. User Terima Reply "OK"
    
    Note over B: Auto Recovery System<br/>Error Handling<br/>Session Management
```

### 🇺🇸 English
```mermaid
sequenceDiagram
    participant U as 👤 User Telegram
    participant T as 📡 Telegram Client
    participant B as 🔧 TELEtoWA Bridge
    participant W as 📱 WhatsApp Client
    participant A as 👤 Admin WhatsApp
    
    U->>T: 1. Send Message "Hello Admin"
    T->>B: 2. Receive Message (Event Handler)
    B->>W: 3. Process & Forward
    W->>A: 4. Send Notification to Admin
    A->>W: 5. Admin Reply "/reply @user OK"
    W->>B: 6. Process Command
    B->>T: 7. Parse Command & Send Reply
    T->>U: 8. User Receive Reply "OK"
    
    Note over B: Auto Recovery System<br/>Error Handling<br/>Session Management
```

---

## 🛠️ Error Recovery Process

### 🇮🇩 Bahasa Indonesia
```mermaid
flowchart TD
    A[❌ Error Detected<br/>Bad MAC / Connection Closed] --> B{🔄 Auto Retry<br/>3 attempts}
    B -->|Success| C[✅ System Ready]
    B -->|Failed| D[🧹 Session Cleanup]
    D --> E[🔌 Reconnect WhatsApp]
    E --> F{⚙️ PM2 Auto Restart<br/>Needed?}
    F -->|Yes| G[📊 Monitor Status]
    F -->|No| H[📊 Monitor Status]
    G --> I[✅ Success!<br/>System Ready]
    H --> I
    
    style A fill:#ffebee
    style C fill:#e8f5e8
    style I fill:#e8f5e8
    style B fill:#fff3e0
    style D fill:#fff3e0
    style E fill:#fff3e0
    style F fill:#fff3e0
    style G fill:#e3f2fd
    style H fill:#e3f2fd
```

### 🇺🇸 English
```mermaid
flowchart TD
    A[❌ Error Detected<br/>Bad MAC / Connection Closed] --> B{🔄 Auto Retry<br/>3 attempts}
    B -->|Success| C[✅ System Ready]
    B -->|Failed| D[🧹 Session Cleanup]
    D --> E[🔌 Reconnect WhatsApp]
    E --> F{⚙️ PM2 Auto Restart<br/>Needed?}
    F -->|Yes| G[📊 Monitor Status]
    F -->|No| H[📊 Monitor Status]
    G --> I[✅ Success!<br/>System Ready]
    H --> I
    
    style A fill:#ffebee
    style C fill:#e8f5e8
    style I fill:#e8f5e8
    style B fill:#fff3e0
    style D fill:#fff3e0
    style E fill:#fff3e0
    style F fill:#fff3e0
    style G fill:#e3f2fd
    style H fill:#e3f2fd
```

---

## 🔧 Component Interaction

### 🇮🇩 Bahasa Indonesia
```mermaid
graph TB
    subgraph "TELEtoWA Components"
        subgraph "📡 Telegram Module"
            TM1[StringSession]
            TM2[Event Handler]
            TM3[User Filter]
            TM4[API Client]
        end
        
        subgraph "🔧 Core Engine"
            CE1[Message Processor]
            CE2[Media Handler]
            CE3[Reply System]
            CE4[Command Parser]
        end
        
        subgraph "📱 WhatsApp Module"
            WM1[Baileys]
            WM2[Socket Mgmt]
            WM3[Auth State]
            WM4[Connection]
        end
        
        subgraph "🛠️ Recovery System"
            RS1[Auto Retry]
            RS2[Session Clean]
            RS3[Reconnect]
            RS4[Error Handler]
        end
        
        subgraph "📊 Monitoring & Logs"
            ML1[Error Logs]
            ML2[Status Check]
            ML3[Performance]
            ML4[Health Check]
        end
        
        subgraph "⚙️ PM2 Service"
            PM1[Auto Restart]
            PM2[Process Mgmt]
            PM3[Log Rotation]
            PM4[Memory Limit]
        end
        
        subgraph "🔐 Security & Auth"
            SA1[API Keys]
            SA2[Session Mgmt]
            SA3[Access Control]
            SA4[Encryption]
        end
    end
    
    TM1 --> CE1
    TM2 --> CE1
    TM3 --> CE1
    TM4 --> CE1
    
    CE1 --> WM1
    CE2 --> WM2
    CE3 --> WM3
    CE4 --> WM4
    
    WM1 --> RS1
    WM2 --> RS2
    WM3 --> RS3
    WM4 --> RS4
    
    RS1 --> ML1
    RS2 --> ML2
    RS3 --> ML3
    RS4 --> ML4
    
    ML1 --> PM1
    ML2 --> PM2
    ML3 --> PM3
    ML4 --> PM4
    
    PM1 --> SA1
    PM2 --> SA2
    PM3 --> SA3
    PM4 --> SA4
    
    style CE1 fill:#e1f5fe
    style CE2 fill:#e1f5fe
    style CE3 fill:#e1f5fe
    style CE4 fill:#e1f5fe
```

### 🇺🇸 English
```mermaid
graph TB
    subgraph "TELEtoWA Components"
        subgraph "📡 Telegram Module"
            TM1[StringSession]
            TM2[Event Handler]
            TM3[User Filter]
            TM4[API Client]
        end
        
        subgraph "🔧 Core Engine"
            CE1[Message Processor]
            CE2[Media Handler]
            CE3[Reply System]
            CE4[Command Parser]
        end
        
        subgraph "📱 WhatsApp Module"
            WM1[Baileys]
            WM2[Socket Mgmt]
            WM3[Auth State]
            WM4[Connection]
        end
        
        subgraph "🛠️ Recovery System"
            RS1[Auto Retry]
            RS2[Session Clean]
            RS3[Reconnect]
            RS4[Error Handler]
        end
        
        subgraph "📊 Monitoring & Logs"
            ML1[Error Logs]
            ML2[Status Check]
            ML3[Performance]
            ML4[Health Check]
        end
        
        subgraph "⚙️ PM2 Service"
            PM1[Auto Restart]
            PM2[Process Mgmt]
            PM3[Log Rotation]
            PM4[Memory Limit]
        end
        
        subgraph "🔐 Security & Auth"
            SA1[API Keys]
            SA2[Session Mgmt]
            SA3[Access Control]
            SA4[Encryption]
        end
    end
    
    TM1 --> CE1
    TM2 --> CE1
    TM3 --> CE1
    TM4 --> CE1
    
    CE1 --> WM1
    CE2 --> WM2
    CE3 --> WM3
    CE4 --> WM4
    
    WM1 --> RS1
    WM2 --> RS2
    WM3 --> RS3
    WM4 --> RS4
    
    RS1 --> ML1
    RS2 --> ML2
    RS3 --> ML3
    RS4 --> ML4
    
    ML1 --> PM1
    ML2 --> PM2
    ML3 --> PM3
    ML4 --> PM4
    
    PM1 --> SA1
    PM2 --> SA2
    PM3 --> SA3
    PM4 --> SA4
    
    style CE1 fill:#e1f5fe
    style CE2 fill:#e1f5fe
    style CE3 fill:#e1f5fe
    style CE4 fill:#e1f5fe
```

---

## 🚀 Deployment Flow

### 🇮🇩 Bahasa Indonesia
```mermaid
graph LR
    subgraph "💻 Development"
        D1[Code Development]
        D2[Testing]
        D3[Package]
    end
    
    subgraph "🖥️ Server (VPS/Cloud)"
        S1[Node.js 16+]
        S2[PM2 Service]
        S3[Auto Restart]
        S4[Log Rotation]
    end
    
    subgraph "📱 Production"
        P1[Telegram API]
        P2[WhatsApp API]
        P3[Monitoring]
        P4[Backup]
    end
    
    subgraph "🔐 Security"
        SEC1[API Keys]
        SEC2[Session Mgmt]
        SEC3[Access Control]
        SEC4[Encryption]
    end
    
    D1 --> D2
    D2 --> D3
    D3 --> S1
    S1 --> S2
    S2 --> S3
    S3 --> S4
    S4 --> P1
    P1 --> P2
    P2 --> P3
    P3 --> P4
    
    SEC1 --> S1
    SEC2 --> S2
    SEC3 --> S3
    SEC4 --> S4
    
    style D1 fill:#e8f5e8
    style S2 fill:#e1f5fe
    style P3 fill:#fff3e0
    style SEC1 fill:#f3e5f5
```

### 🇺🇸 English
```mermaid
graph LR
    subgraph "💻 Development"
        D1[Code Development]
        D2[Testing]
        D3[Package]
    end
    
    subgraph "🖥️ Server (VPS/Cloud)"
        S1[Node.js 16+]
        S2[PM2 Service]
        S3[Auto Restart]
        S4[Log Rotation]
    end
    
    subgraph "📱 Production"
        P1[Telegram API]
        P2[WhatsApp API]
        P3[Monitoring]
        P4[Backup]
    end
    
    subgraph "🔐 Security"
        SEC1[API Keys]
        SEC2[Session Mgmt]
        SEC3[Access Control]
        SEC4[Encryption]
    end
    
    D1 --> D2
    D2 --> D3
    D3 --> S1
    S1 --> S2
    S2 --> S3
    S3 --> S4
    S4 --> P1
    P1 --> P2
    P2 --> P3
    P3 --> P4
    
    SEC1 --> S1
    SEC2 --> S2
    SEC3 --> S3
    SEC4 --> S4
    
    style D1 fill:#e8f5e8
    style S2 fill:#e1f5fe
    style P3 fill:#fff3e0
    style SEC1 fill:#f3e5f5
```

---

## 📊 Feature Overview

### 🇮🇩 Bahasa Indonesia
```mermaid
mindmap
  root((TELEtoWA v1.1.0))
    🔄 Auto Forward
      Real-time
      Multi-platform
      Offline Mode
      Instant
    📱 Media Support
      Photos
      Videos
      Documents
      Audio Files
    🤖 Smart Filter
      Bot Filter
      Self Filter
      Username Filter
      Spam Block
    💬 Smart Reply
      Command System
      Auto Reply
      User Target
      Multi User
    🛠️ Auto Recovery
      Error Handle
      Session Clean
      Auto Retry
      Reconnect
    📊 Monitoring
      Real-time Logs
      Error Logs
      Status Check
      Performance
    ⚡ High Performance
      PM2 Service
      Memory Opt
      Fast Response
      Auto Restart
    🔐 Security
      API Encrypt
      Session Sec
      Access Ctrl
      Data Privacy
```

### 🇺🇸 English
```mermaid
mindmap
  root((TELEtoWA v1.1.0))
    🔄 Auto Forward
      Real-time
      Multi-platform
      Offline Mode
      Instant
    📱 Media Support
      Photos
      Videos
      Documents
      Audio Files
    🤖 Smart Filter
      Bot Filter
      Self Filter
      Username Filter
      Spam Block
    💬 Smart Reply
      Command System
      Auto Reply
      User Target
      Multi User
    🛠️ Auto Recovery
      Error Handle
      Session Clean
      Auto Retry
      Reconnect
    📊 Monitoring
      Real-time Logs
      Error Logs
      Status Check
      Performance
    ⚡ High Performance
      PM2 Service
      Memory Opt
      Fast Response
      Auto Restart
    🔐 Security
      API Encrypt
      Session Sec
      Access Ctrl
      Data Privacy
```

---

## 🎯 Use Case Timeline

### 🇮🇩 Bahasa Indonesia
```mermaid
gantt
    title Skenario Penggunaan: Toko Online
    dateFormat  X
    axisFormat %s
    
    section Customer
    Kirim Pesan           :done, c1, 0, 2
    Kirim Foto           :done, c2, 2, 4
    Terima Reply         :done, c3, 8, 10
    
    section TELEtoWA
    Proses Pesan         :done, t1, 0, 2
    Forward ke Admin     :done, t2, 2, 4
    Proses Command       :done, t3, 6, 8
    Kirim Reply          :done, t4, 8, 10
    
    section Admin
    Terima Notifikasi    :done, a1, 4, 6
    Kirim Command        :done, a2, 6, 8
```

### 🇺🇸 English
```mermaid
gantt
    title Use Case Scenario: Online Store
    dateFormat  X
    axisFormat %s
    
    section Customer
    Send Message         :done, c1, 0, 2
    Send Photo           :done, c2, 2, 4
    Receive Reply        :done, c3, 8, 10
    
    section TELEtoWA
    Process Message      :done, t1, 0, 2
    Forward to Admin     :done, t2, 2, 4
    Process Command      :done, t3, 6, 8
    Send Reply           :done, t4, 8, 10
    
    section Admin
    Receive Notification :done, a1, 4, 6
    Send Command         :done, a2, 6, 8
```

---

**📝 Note:** Mermaid diagrams ini dapat dirender di:
- 📖 GitHub README
- 📚 GitLab Wiki
- 🎯 Notion
- 📊 Confluence
- 🌐 Mermaid Live Editor 