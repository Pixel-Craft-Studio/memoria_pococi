import InboxComponent from "./Inbox";

const Contact = () => {


  return (
    <div className="relative flex min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white ">
      <div className="flex-1 ">
        <InboxComponent></InboxComponent>
      </div>
    </div>
  );
};

export default Contact;
