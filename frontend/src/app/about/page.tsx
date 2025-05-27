export default function AboutPage() {
  return (
    <main className="p-6 max-w-2xl">
      <h1 className="text-3xl font-semibold mb-6">Help &amp; About</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-1">About</h2>
        <p className="text-muted-foreground mb-1">Version 1.0.0</p>
        <p className="text-muted-foreground">
          A trading bot application for automated trading and backtesting.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Documentation</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>
            <a href="#" className="hover:underline">
              User Guide
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Frequently Asked Questions
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Support</h2>
        <p className="text-muted-foreground">
          For assistance, contact us at{" "}
          <a href="mailto:support@example.com" className="hover:underline">
            support@example.com
          </a>
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-1">License</h2>
        <p className="text-muted-foreground mb-1">
          Licensed under the MIT License
        </p>
        <a
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:underline"
        >
          View on GitHub
        </a>
      </section>
    </main>
  );
}
