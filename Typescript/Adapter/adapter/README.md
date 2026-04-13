# Adapter Design Pattern - React Frontend

This project implements the **Adapter Design Pattern** to manage data sources in a React application. It demonstrates how to decouple UI components from specific data fetching logic.

---

## 📖 Description
The **Adapter Pattern** is a structural design pattern that allows objects with incompatible interfaces to work together. It acts as a wrapper that catches calls for one object and transforms them into a format and interface readable by the second object.

In this application, we use it to abstract the communication with our logging service, providing a unified interface for both local simulation and remote API calls.

## 🛠️ Problem Solved
Our frontend needs to fetch and send logs. However, the backend (Django API) might not be available during frontend development, or we might want to switch between different logging services in the future.

Without the Adapter pattern, changing the data source would require modifying the `LogDashboard` component directly. With this pattern, the component only knows about the `IDataProvider` interface, making it **agnostic** to where the data comes from.

## ✅ When to use it
- When you want to decouple your application from a third-party library or an unstable API.
- When you need to support multiple data sources through a common interface.
- When you want to provide a **Mock** mode for development and testing without changing production logic.

## ❌ When NOT to use it
- If your application is very simple and will always use a single, stable data source.
- If introducing an abstraction layer adds more complexity than the flexibility it provides.

## 💻 Implementation (TypeScript)

### 1. The Interface
Every adapter must implement the `IDataProvider` contract:

```typescript
export interface LogEntry {
  id: number;
  message: string;
  level: 'info' | 'error';
}

export interface IDataProvider {
  getLogs(): Promise<LogEntry[]>;
  postLog(message: string, useExternal: boolean): Promise<{ status: string; adapter: string }>;
}
```

### 2. Concrete Adapters
We have two implementations that the application can switch between at runtime:

#### MockDataAdapter
Used for local development. It stores logs in memory and simulates network delays.
```typescript
export class MockDataAdapter implements IDataProvider {
  private logs: LogEntry[] = [...];

  async getLogs(): Promise<LogEntry[]> {
    // Returns local in-memory logs
  }

  async postLog(message: string, useExternal: boolean): Promise<any> {
    // Appends log to local array
  }
}
```

#### ApiDataAdapter
Used for production. It uses the `fetch` API to communicate with a Django REST backend.
```typescript
export class ApiDataAdapter implements IDataProvider {
  private baseUrl = 'http://localhost:8000/api';

  async getLogs(): Promise<LogEntry[]> {
    const response = await fetch(`${this.baseUrl}/logs/`);
    return response.json();
  }
}
```

## 🚀 Proposed Use Case
The `LogDashboard` component allows users to toggle between the **Mock** and **API** providers. This proves that the UI logic remains identical regardless of the data source selected, demonstrating perfect decoupling.

## 🏃 Execution Example

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Application
```bash
npm start
```

### 3. Test the Pattern
1. Open the application at [http://localhost:3000](http://localhost:3000).
2. Check/Uncheck the **"Use Django API"** box.
3. Notice how the "Logs List" updates using different adapters without refreshing the page or changing the UI code.
