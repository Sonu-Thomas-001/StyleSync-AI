# StyleSync AI

**A calm, intelligent stylist who understands your wardrobe, your lifestyle, and your constraints.**

StyleSync AI is a premium Virtual Stylist application that leverages Google's multimodal Gemini models (Gemini 2.5 Flash & Gemini 3 Preview) to solve the daily dilemma: *"What do I wear with this?"*

Unlike generic image generators, StyleSync acts as a decision-support system for personal style—analyzing fabric, seasonality, and formality to create context-aware outfits.

![Status](https://img.shields.io/badge/Status-Production%20Ready-stone)
![Tech](https://img.shields.io/badge/AI-Gemini%202.5%20%2B%203.0-d6bba8)
![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Tailwind-1c1917)

---

## 🚀 Key Features

### 1. The Core Styling Engine
- **Visual Analysis:** Upload any clothing item. The AI detects fabric (silk, denim), pattern complexity, and seasonality.
- **Contextual Generation:** Instantly generates three distinct looks:
  - **Casual:** Weekend/Relaxed.
  - **Business:** Corporate/Professional.
  - **Night Out:** Evening/Event.
- **Eco-Conscious Mode:** A toggle that shifts the AI to prioritize timeless, high-rewearability "Capsule Wardrobe" suggestions over fast fashion trends.

### 2. Smart Wardrobe (Gap Analysis)
- **Closet Audit:** Analyzes your current inventory to calculate a "Capsule Score".
- **Gap Detection:** Identifies exactly what is missing (e.g., *"You have 5 floral skirts but lack a neutral blazer to bridge them to business wear"*).
- **Saturation Alerts:** Warns when you are over-buying specific categories.

### 3. Personal Stylist Layer
- **Style DNA:** Visualizes your risk appetite (Safe vs. Bold), color comfort zone, and signature silhouettes.
- **Educational AI:** The "Explain" tab on every outfit teaches *why* a look works (color theory, silhouette balance) rather than just showing it.

### 4. Enterprise & Retail
- **Kiosk Mode:** A high-contrast, touch-optimized interface for in-store iPads allowing shoppers to scan items and find complementary products in specific aisles.
- **BrandHub:** A B2B dashboard for fashion brands to track how their items are being styled by the AI community.

---

## 🛠 Tech Stack

*   **Frontend:** React 19, TypeScript, Tailwind CSS
*   **AI Models:** 
    *   `gemini-2.5-flash-image` (Visual generation & editing)
    *   `gemini-3-flash-preview` (Complex reasoning, gap analysis, fabric analysis)
*   **State Management:** React Hooks
*   **Styling:** Custom "Ivory to Charcoal" palette with mesh gradients.

---

## 📦 Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/stylesync-ai.git
    cd stylesync-ai
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure API Key**
    Create a `.env` file in the root directory and add your Google GenAI API key:
    ```env
    API_KEY=your_google_genai_api_key_here
    ```

4.  **Run the application**
    ```bash
    npm start
    ```

---

## ✨ Feature Matrix

### 🧠 Core Capabilities
| Feature | Description | Status |
| :--- | :--- | :--- |
| **Item Photo Upload** | Upload a single clothing item (skirt, top, jacket, etc.) | ✅ Implemented |
| **Visual Understanding** | AI analyzes color palette, pattern complexity, and texture | ✅ Implemented |
| **Style Classification** | Detects casual, business, and evening styling potential | ✅ Implemented |
| **Fabric Awareness** | Considers fabric type (denim, silk, cotton, wool) | ✅ Implemented |

### 👗 Outfit Generation Engine
| Feature | Description | Status |
| :--- | :--- | :--- |
| **3 Outfit Modes** | Generates Casual, Business, and Night Out looks | ✅ Implemented |
| **Complete Looks** | Each outfit includes top, bottom, footwear, and accessories | ✅ Implemented |
| **Edit & Refine** | Natural language editing (e.g., "Add a leather jacket") | ✅ Implemented |
| **Eco-Conscious Mode** | Prioritize timeless, sustainable combinations | ✅ Implemented |

### 🧳 Closet Intelligence
| Feature | Description | Status |
| :--- | :--- | :--- |
| **Wardrobe Audit** | Maximize outfit combinations from existing items | ✅ Implemented |
| **Gap Analysis** | AI suggests the *one* item missing to unlock 10+ outfits | ✅ Implemented |
| **Capsule Score** | Rates the versatility of your collection | ✅ Implemented |

### 🧬 Personalization & Learning
| Feature | Description | Status |
| :--- | :--- | :--- |
| **Style DNA** | Learns user’s color, silhouette, and risk preference | ✅ Implemented |
| **Explain-My-Outfit** | AI explains color theory and silhouette balance | ✅ Implemented |
| **Community Feed** | Anonymous "Pinterest-style" inspiration board | ✅ Implemented |

### 💎 Enterprise / Future-Facing
| Feature | Description | Status |
| :--- | :--- | :--- |
| **Retail Kiosk Mode** | In-store "Scan & Style" with aisle navigation | ✅ Implemented |
| **BrandHub** | Analytics dashboard for fashion brands | ✅ Implemented |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

> *"Fashion is the armor to survive the reality of everyday life."* — Bill Cunningham
