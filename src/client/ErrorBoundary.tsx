import * as React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.log(error);
    console.log(info);
  }

  render() {
    if (this.state.hasError) {
      return <p>{this.state.error}</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
