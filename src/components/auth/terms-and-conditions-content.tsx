export const TermsAndConditionsContent = () => (
  <div className="space-y-4 text-sm leading-relaxed text-gray-700">
    <p>
      Welcome to Qocent, a multi-cloud platform operated by Qucoon Limited. These
      Terms and Conditions (the &quot;Terms&quot;) outline the rules for using our
      service. By signing up or using Qocent, you agree to these Terms. If you
      don&apos;t agree, please don&apos;t use the platform.
    </p>

    <p>
      We&apos;re Qucoon Limited, primarily based in Nigeria with operations in
      Canada, United Kingdom and branches worldwide. Qocent helps you monitor,
      deploy, and manage resources across multiple clouds like AWS, Azure, GCP,
      and Huawei. Think of it as your unified dashboard for cloud setups - invite
      teams, optimize costs, and keep everything running smoothly.
    </p>

    <p>
      These Terms form a legal agreement between you (the &quot;User&quot; or
      &quot;You&quot;) and Qucoon Limited (&quot;We,&quot; &quot;Us,&quot; or
      &quot;Our&quot;). We&apos;re starting operations in the US, so these Terms
      are governed by the laws of the State of Delaware, USA, without regard to
      conflict of laws principles. If you&apos;re using Qocent on behalf of a
      company, you confirm you have the authority to bind that company to these
      Terms.
    </p>

    <section>
      <h3 className="mb-2 font-semibold text-gray-900">1. Definitions</h3>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Account:</strong> Your unique profile on Qocent, including linked
          cloud credentials.
        </li>
        <li>
          <strong>Content:</strong> Any data, configurations, or materials you
          upload or generate on Qocent.
        </li>
        <li>
          <strong>Service:</strong> Qocent&apos;s platform for multi-cloud
          monitoring, deployment, cost optimization, resource management, financial
          tracking, team collaboration, and role-based access.
        </li>
        <li>
          <strong>Subscription:</strong> Your paid or free access plan, which could
          be per user, per project, monthly, or annual.
        </li>
      </ul>
    </section>

    <section>
      <h3 className="mb-2 font-semibold text-gray-900">2. Signing Up and Access</h3>
      <p className="mb-2">
        You can sign up with an email and password or via Google. To connect clouds,
        provide your keys or credentials for AWS, Azure, GCP, or Huawei – we use
        these to give you direct API access for deployments and monitoring.
      </p>
      <p className="mb-2">
        There&apos;s no age restriction, but you must be legally able to enter
        contracts in your jurisdiction. Keep your login details secure; you&apos;re
        responsible for all activity on your Account. If something suspicious
        happens, tell us right away at{" "}
        <a href="mailto:support@qocent.com" className="text-green-700 underline">
          support@qocent.com
        </a>
        .
      </p>
      <p>
        We offer a free tier for basic use, plus paid Subscriptions for advanced
        features like team invites and full cost tools. Trials are available – no
        charge during the trial, but it auto-converts to paid unless canceled.
      </p>
    </section>

    <section>
      <h3 className="mb-2 font-semibold text-gray-900">3. Using the Service</h3>
      <p className="mb-2">Qocent lets you:</p>
      <ul className="mb-2 list-disc space-y-1 pl-5">
        <li>Deploy and monitor resources directly.</li>
        <li>Optimize costs and track finances.</li>
        <li>Invite teams with role-based access.</li>
        <li>Connect and manage your existing cloud accounts.</li>
      </ul>
      <p className="mb-2">
        You own your deployments, cloud configs, and data. When you create servers
        or resources on Qocent, they&apos;re mirrored on your linked cloud
        provider, we facilitate access.
      </p>
      <p className="mb-2">
        We don&apos;t own your data; you grant us a limited license to process it
        for providing the Service (e.g., monitoring metadata). We comply with ISO
        27001 for security and ISO 27701 for privacy management.
      </p>
      <p className="mb-1 font-medium text-gray-900">Prohibited Uses</p>
      <p className="mb-2">Don&apos;t:</p>
      <ul className="mb-2 list-disc space-y-1 pl-5">
        <li>Use Qocent for illegal activities.</li>
        <li>Reverse engineer, decompile, or hack the platform.</li>
        <li>Make excessive API calls that overload our systems.</li>
        <li>Resell or share access without permission.</li>
        <li>Sign up from a malicious IP (we&apos;ll block those).</li>
      </ul>
      <p>
        If we spot violations, we may suspend your Account immediately.
      </p>
    </section>

    <section>
      <h3 className="mb-2 font-semibold text-gray-900">
        4. Subscriptions, Payments, Cancellations, and Refunds
      </h3>
      <p className="mb-2">
        Subscriptions are per user or per project, billed monthly or annually with
        auto-renewal unless you cancel. We use a secure payment processor (details
        provided at checkout).
      </p>
      <p className="mb-1 font-medium text-gray-900">Cancellation of Subscriptions</p>
      <p className="mb-2">
        Your paid Subscription will continue until cancelled. You may cancel at any
        time through your account settings before the next recurring charge is
        processed. Cancellation takes effect at the end of the current billing
        period – you&apos;ll keep full access until then. If you cancel after the
        next charge has been processed, no refund will be issued for that period.
      </p>
      <p className="mb-2">
        Please note: Deleting your account does not automatically cancel your
        Subscription or entitle you to a refund. You must cancel the Subscription
        separately.
      </p>
      <p className="mb-2">
        As access to the Service (including paid features) is granted immediately
        upon subscription, you acknowledge that digital services begin right away
        and, where applicable consumer laws provide a right of withdrawal, you waive
        that right by starting to use the Service.
      </p>
      <p className="mb-1 font-medium text-gray-900">Refunds</p>
      <p className="mb-2">
        Refunds are available only in limited cases, such as during trial periods
        or if required by law. Specifically:
      </p>
      <ul className="mb-2 list-disc space-y-1 pl-5">
        <li>
          You may request a refund for a paid Subscription within 14 days of the
          initial purchase (or renewal, if applicable), provided the Service has not
          been substantially used (for example, if significant resources have been
          deployed, monitored, or if advanced features have been heavily accessed,
          we may consider it substantially consumed).
        </li>
        <li>
          Refunds are not available for accounts that violate these Terms, engage in
          suspicious activity, or are deemed unacceptable at our sole discretion.
        </li>
        <li>
          If we determine you are abusing the refund policy, we may suspend or
          terminate your Account and deny future use of the Service, without
          issuing any refund.
        </li>
        <li>
          To request a refund, contact us via{" "}
          <a href="mailto:info@qocent.com" className="text-green-700 underline">
            info@qocent.com
          </a>{" "}
          with details of your purchase.
        </li>
        <li>
          Approved refunds will be issued using the original payment method. If that
          method is unavailable, blocked, or deactivated, we are not obligated to
          use an alternative.
        </li>
        <li>
          No refunds will be provided if your Account is deleted (voluntarily or by
          us).
        </li>
      </ul>
      <p>
        For free tiers or trials converting to paid, standard rules apply. You should
        cancel before billing to avoid charges.
      </p>
    </section>

    <section>
      <h3 className="mb-2 font-semibold text-gray-900">5. Data and Privacy</h3>
      <p className="mb-2">
        We take privacy seriously, here&apos;s the information about what we collect
        and how we use it:
      </p>
      <p className="mb-1 font-medium text-gray-900">What We Collect</p>
      <ul className="mb-2 list-disc space-y-1 pl-5">
        <li>Account info (email, name).</li>
        <li>Cloud credentials (stored securely, used only for your Service).</li>
        <li>Usage data (e.g., deployments, monitoring logs) to improve Qocent.</li>
        <li>Payment details (handled by our processor).</li>
      </ul>
      <p className="mb-1 font-medium text-gray-900">How We Use It</p>
      <ul className="mb-2 list-disc space-y-1 pl-5">
        <li>To provide and improve the Service (e.g., cost optimization).</li>
        <li>For security and compliance (ISO standards).</li>
        <li>To communicate updates or support.</li>
      </ul>
      <p className="mb-2">
        We don&apos;t sell your data. We may share with affiliates or service
        providers (e.g., cloud APIs) under strict agreements. If law requires,
        we&apos;ll disclose – but we&apos;ll notify you if possible.
      </p>
      <p className="mb-1 font-medium text-gray-900">Security and Retention</p>
      <p className="mb-2">
        Your data is encrypted and protected per ISO 27001. We back it up for 90
        days. On termination, you have 10 days to export; then it&apos;s deleted.
      </p>
      <p>
        You&apos;re a data controller; we&apos;re a processor. Ensure your data
        complies with laws (e.g., no illegal content). For international transfers
        (Nigeria, Canada, etc.), we use standard clauses. Questions? Email{" "}
        <a href="mailto:info@qocent.com" className="text-green-700 underline">
          info@qocent.com
        </a>
      </p>
    </section>

    <section>
      <h3 className="mb-2 font-semibold text-gray-900">6. Intellectual Property</h3>
      <p>
        We own Qocent, the code, design, and features. You own your Content and
        deployments. Don&apos;t copy or misuse our IP. Feedback you give? We can use
        it to improve, no strings attached.
      </p>
    </section>

    <section>
      <h3 className="mb-2 font-semibold text-gray-900">7. Warranties and Service Levels</h3>
      <p className="mb-2">
        The Service is provided &quot;as is&quot; and &quot;as available&quot;
        without any warranties of any kind, express or implied. We specifically
        disclaim all implied warranties, including but not limited to warranties of
        merchantability, fitness for a particular purpose, title, and
        non-infringement.
      </p>
      <p>
        We do not guarantee that the Service will be uninterrupted, error-free. You
        use Qocent at your own risk.
      </p>
    </section>

    <section>
      <h3 className="mb-2 font-semibold text-gray-900">8. Liability Limits</h3>
      <p className="mb-2">
        Our liability is capped at what you paid us in the last 12 months. No
        indirect damages (e.g., lost profits, data loss) – even if we knew about the
        risk. This doesn&apos;t apply to gross negligence or willful misconduct.
      </p>
      <p>You indemnify us against claims from your misuse or Content.</p>
    </section>

    <section>
      <h3 className="mb-2 font-semibold text-gray-900">9. Termination and Suspension</h3>
      <p className="mb-2">We can suspend or terminate for:</p>
      <ul className="mb-2 list-disc space-y-1 pl-5">
        <li>Non-payment (immediate).</li>
        <li>Breach of Terms.</li>
        <li>Suspicious activity.</li>
        <li>Over-deployment or illegal integrations.</li>
      </ul>
      <p className="mb-2">
        You&apos;ll get notice where possible (e.g., 30 days for minor breaches). On
        end, export your data in 10 days, then it&apos;s gone. Sections like IP,
        Liability, and Governing Law survive.
      </p>
      <p>You can cancel anytime via your Account.</p>
    </section>

    <section>
      <h3 className="mb-2 font-semibold text-gray-900">10. Changes to Terms</h3>
      <p>
        We&apos;ll update these with 30 days&apos; notice (email or in-app).
        Continued use means you agree.
      </p>
    </section>

    <section>
      <h3 className="mb-2 font-semibold text-gray-900">11. Disputes</h3>
      <p>
        Any issues? Let&apos;s talk first. If not, arbitration in Delaware under AAA
        rules. No class actions.
      </p>
    </section>

    <section>
      <h3 className="mb-2 font-semibold text-gray-900">12. Miscellaneous</h3>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Force Majeure:</strong> We&apos;re not liable for delays from events
          beyond control (e.g., natural disasters).
        </li>
        <li>
          <strong>Export:</strong> Comply with US export laws.
        </li>
        <li>
          <strong>Entire Agreement:</strong> These Terms are it – no side deals.
        </li>
        <li>
          <strong>Contact:</strong>{" "}
          <a href="mailto:info@qocent.com" className="text-green-700 underline">
            info@qocent.com
          </a>
          .
        </li>
      </ul>
    </section>

    <p className="font-medium text-gray-900">
      Thanks for using Qocent – let&apos;s build together!
    </p>
  </div>
);
