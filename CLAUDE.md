# Bitcoin Dashboard

A comprehensive Bitcoin blockchain explorer and analysis platform built with Next.js, featuring real-time data, interactive tools, and advanced Bitcoin strategy modeling.

## Project Overview

This Bitcoin Dashboard provides a complete suite of tools for Bitcoin enthusiasts, investors, and analysts. It combines real-time blockchain data with sophisticated financial modeling capabilities, offering insights into Bitcoin's network health, transaction details, and long-term investment strategies.

## Key Features

### 🔍 **Blockchain Explorer**
- **Real-time Block Data**: Latest blocks with detailed information including height, timestamp, transaction count, and block size
- **Transaction Details**: Complete transaction information with inputs/outputs, fees, and raw hex data
- **Network Statistics**: Live network info including connections, mempool size, and blockchain stats
- **Special Blocks**: Highlighted historical significant blocks (Genesis, Pizza Day, etc.)

### 📊 **Financial Tools**

#### **Bitcoin24 Strategy Forecasting**
- **21-year projections** based on Michael Saylor's Bitcoin24 model
- **5 investment strategies**: Normie (0% BTC), BTC 10%, BTC Maxi (80%), Double Maxi (90%), Triple Maxi (95%)
- **4 scenario types**: Individual, Corporate, Institution, Nation State
- **Flexible assumptions**: Customizable parameters for inflation, growth rates, risk factors
- **Interactive charts**: Portfolio evolution, Bitcoin price projections, annual returns
- **Strategy comparison**: Side-by-side analysis with performance metrics

#### **FCF (Free Cash Flow) Calculator**
- Models Bitcoin collateral-based lending strategies
- Calculates free cash flow generation over time
- Based on Mark Moss investment methodology
- Dynamic calculations with real Bitcoin price data

#### **Sats Converter**
- Convert between Bitcoin (BTC), satoshis (sats), and USD
- Real-time price integration
- Support for custom exchange rates
- Multiple unit display options

### 📱 **User Experience**
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Dark/Light Themes**: User preference-based theming
- **Real-time Updates**: Live data fetching and display
- **Performance Optimized**: Server-side rendering with client-side hydration
- **SEO Optimized**: Dynamic metadata generation for all pages

## Technology Stack

### **Framework & Runtime**
- **Next.js 15.3.1**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript 5**: Full type safety and developer experience
- **Node.js**: Server-side runtime

### **Styling & UI**
- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible, unstyled UI primitives
- **Lucide React**: Modern icon library
- **Custom Components**: Reusable UI component system

### **Data Visualization**
- **Recharts 3.1.0**: React-based charting library
- **Interactive Charts**: Line charts, area charts, bar charts
- **Custom Tooltips**: Enhanced data display

### **Data & State Management**
- **Server Components**: Default server-side rendering
- **Client Components**: Selective client-side interactivity
- **React Hooks**: useState, useEffect for state management
- **Local Storage**: Browser-based data persistence

### **Development Tools**
- **ESLint 9**: Code linting and quality enforcement
- **Husky**: Git hooks for code quality
- **Vitest**: Fast unit testing framework
- **Testing Library**: Component testing utilities

### **APIs & External Services**
- **Bitcoin Core RPC**: Direct blockchain data access
- **Real-time Price APIs**: Live Bitcoin price feeds
- **Custom API Routes**: Next.js API endpoints

## Architecture

### **Server-First Design**
- **Metadata Generation**: Dynamic SEO optimization
- **Performance**: Optimized Core Web Vitals
- **Static Generation**: Pre-built pages where possible
- **Dynamic Routes**: Real-time data for blockchain content

### **Component Structure**
```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
│   ├── ui/             # Base UI primitives
│   ├── bitcoin24/      # Bitcoin24 feature components
│   ├── dashboard/      # Homepage dashboard components
│   └── [feature]/      # Feature-specific components
├── lib/                # Utilities and business logic
│   ├── utils/          # Helper functions
│   └── types.ts        # TypeScript definitions
└── public/             # Static assets
```

### **Data Flow**
1. **Server Components**: Fetch data at build/request time
2. **Client Components**: Handle user interactions
3. **API Routes**: Process complex calculations
4. **Type Safety**: End-to-end TypeScript coverage

## Financial Modeling

### **Bitcoin24 Implementation**
- **Adoption Curves**: Sigmoid growth modeling
- **Diminishing Returns**: Realistic long-term projections
- **Risk Modeling**: Volatility and regulatory factors
- **Portfolio Rebalancing**: Dynamic allocation strategies
- **Inflation Adjustment**: Real vs nominal value calculations

### **Calculation Engine**
- **Compound Interest**: Accurate financial calculations
- **Risk Metrics**: Sharpe ratios, maximum drawdown
- **Scenario Analysis**: Monte Carlo-style projections
- **Performance Comparison**: Multi-strategy analysis

## Development Guidelines

### **Code Quality**
- **TypeScript Strict Mode**: No `any` types allowed
- **ESLint Rules**: Enforced code standards
- **Component Patterns**: Consistent prop interfaces
- **Error Handling**: Comprehensive error boundaries

### **Testing Strategy**
- **Unit Tests**: Core calculation logic
- **Component Tests**: UI interaction testing
- **Integration Tests**: End-to-end workflows
- **Performance Tests**: Core Web Vitals monitoring

### **Performance Optimization**
- **Code Splitting**: Feature-based bundle splitting
- **Image Optimization**: Next.js Image component
- **Caching Strategy**: Static and dynamic content caching
- **Bundle Analysis**: Regular size monitoring

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## Environment Variables

Required environment variables for full functionality:
- Bitcoin RPC connection details
- Price API keys
- Analytics tracking (optional)

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile Support**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Graceful degradation for older browsers

## Contributing

This project follows standard Git workflow with feature branches, pull requests, and code review processes. All contributions should include tests and maintain the existing code quality standards.

## License

[License information would go here]

---

*This documentation is maintained for Claude Code AI assistant to understand the project structure, technology choices, and development patterns.*