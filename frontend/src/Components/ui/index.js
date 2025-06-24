// src/components/ui/progress.js
export function Progress({ value }) {
    return (
      <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-700 h-full transition-all rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    );
  }
  
  // src/components/ui/button.js
  export function Button({ children, variant = "default", asChild = false, ...props }) {
    const className = `px-6 py-3 rounded-xl font-semibold shadow-lg transition-all ${
      variant === "outline" 
        ? "border border-gray-400 text-gray-800 hover:bg-gray-200"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }`;
  
    return asChild ? (
      <span className={className} {...props}>{children}</span>
    ) : (
      <button className={className} {...props}>{children}</button>
    );
  }
  
  // src/components/ui/card.js
  export function Card({ children, className = "" }) {
    return <div className={`p-8 bg-white shadow-xl rounded-3xl border border-gray-300 hover:shadow-2xl transition-all ${className}`}>{children}</div>;
  }
  
  export function CardHeader({ children, className = "" }) {
    return <div className={`mb-4 font-semibold text-xl text-gray-800 ${className}`}>{children}</div>;
  }
  
  export function CardTitle({ children, className = "" }) {
    return <h3 className={`text-2xl font-bold text-gray-900 ${className}`}>{children}</h3>;
  }
  
  export function CardContent({ children, className = "" }) {
    return <div className={`text-gray-600 text-lg ${className}`}>{children}</div>;
  }
  