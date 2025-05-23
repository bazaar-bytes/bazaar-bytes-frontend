import * as AlertDialog from "@radix-ui/react-alert-dialog";

export const DeleteModal = ({ deleteProduct }) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-red-500 px-[15px] font-medium leading-none shadow-lg outline-none hover:opacity-80 text-white">
        Delete product
      </button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className=" data-[state=open]:animate-overlayShow fixed inset-0" />
      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none dark:bg-gray-300 dark:text-black">
        <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          Are you absolutely sure?
        </AlertDialog.Title>
        <AlertDialog.Description className="mt-4 mb-5 text-[15px] leading-normal">
          This action cannot be undone. This will permanently delete this
          product from our servers!
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button
              onClick={deleteProduct}
              className="inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
            >
              Yes, delete product
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);
