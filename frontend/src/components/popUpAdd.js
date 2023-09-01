import React from 'react';
import { Dialog } from '@headlessui/react';

// TEST COMPONENT ONLY
// this didn't work, apparently this <Dialog> can't be wrapped in another function/component


function popUpAdd( addIsOpen, setAddIsOpen ) {

  console.log("In Add pop-up");
  
    return (
      <Dialog open={addIsOpen} onClose={() => setAddIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>
  
          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>
  
          <button onClick={() => setAddIsOpen(false)}>Deactivate</button>
          <button onClick={() => setAddIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
    );
  }


export default popUpAdd;
