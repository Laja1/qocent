const img = (name: string) => `/docs/${name}`;

const DocsInvitingAccounts = () => (
  <article className="space-y-8">
    <h1 className="text-3xl font-bold text-gray-900">Inviting Accounts</h1>
    <p className="text-gray-600 leading-relaxed">
      Qocent allows you to invite other Qocent users — team members or clients — to view and
      monitor a specific Server Site. The invited person must already have their own Qocent
      account. They will receive an email invitation, and once they accept, they can see and
      monitor that site based on the role you assigned.
    </p>

    <ol className="relative space-y-0">
      <li className="flex gap-5">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">1</div>
          <div className="w-px flex-1 bg-gray-200 my-1" />
        </div>
        <div className="pb-8">
          <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">Go to Your Server Site</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Log in to your Qocent account and navigate to your list of Server Sites. Find the site
            you want to share, click the three dots (...) next to the site name, and select{" "}
            <span className="font-medium text-gray-800">Invite to Site</span> from the menu.
          </p>
          <div className="flex flex-col gap-3 mt-3">
            <img src={img("invite-step1-three-dots-menu.png")} alt="Three dots menu next to a Server Site" className="rounded-lg border border-gray-200 w-full max-w-xl" />
            <img src={img("invite-step1-invite-option.png")} alt="Invite to Site option in the dropdown menu" className="rounded-lg border border-gray-200 w-full max-w-xl" />
          </div>
        </div>
      </li>

      <li className="flex gap-5">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">2</div>
          <div className="w-px flex-1 bg-gray-200 my-1" />
        </div>
        <div className="pb-8">
          <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">Enter the Invitation Details</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            A pop-up window titled <span className="font-medium text-gray-800">Invite to Workspace</span> will
            appear. Enter the email address of the person you want to invite — this must be the
            email they used to create their Qocent account. In the Role dropdown, choose their
            access level: <span className="font-medium text-gray-800">Member</span> (can view and
            interact) or <span className="font-medium text-gray-800">Viewer</span> (read-only).
            Click Invite to send. You will see a green confirmation: "Invitation created and sent
            successfully."
          </p>
          <div className="flex flex-col gap-3 mt-3">
            <img src={img("invite-step2-invite-popup.png")} alt="Invite to Workspace popup with email and role fields" className="rounded-lg border border-gray-200 w-full max-w-xl" />
            <img src={img("invite-step2-success-message.png")} alt="Green success message after invitation is sent" className="rounded-lg border border-gray-200 w-full max-w-xl" />
          </div>
        </div>
      </li>

      <li className="flex gap-5">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">3</div>
          <div className="w-px flex-1 bg-gray-200 my-1" />
        </div>
        <div className="pb-8">
          <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">What the Invitee Receives</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            The invited person will receive an email showing who invited them, the site name, and
            the assigned role. The email contains an{" "}
            <span className="font-medium text-gray-800">Accept Invitation</span> button. The
            invitation expires in 72 hours. When they click Accept Invitation, they are taken to a
            Qocent page explaining what they will have access to. They must click the green{" "}
            <span className="font-medium text-gray-800">Accept Invitation</span> button on that
            page to confirm.
          </p>
          <div className="flex flex-col gap-3 mt-3">
            <img src={img("invite-step3-email.png")} alt="Invitation email received by the invitee" className="rounded-lg border border-gray-200 w-full max-w-xl" />
            <img src={img("invite-step3-accept-page.png")} alt="Qocent accept invitation confirmation page" className="rounded-lg border border-gray-200 w-full max-w-xl" />
          </div>
        </div>
      </li>

      <li className="flex gap-5">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">4</div>
        </div>
        <div className="pb-0">
          <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">After Accepting</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Once they accept, they will see: "Invitation accepted successfully. You now have access
            to the account." The shared Server Site will immediately appear on their dashboard, and
            they can begin monitoring it based on the role assigned.
          </p>
          <img src={img("invite-step4-success-dashboard.png")} alt="Dashboard showing the newly shared Server Site after accepting" className="mt-3 rounded-lg border border-gray-200 w-full max-w-xl" />
        </div>
      </li>
    </ol>
  </article>
);

export default DocsInvitingAccounts;
