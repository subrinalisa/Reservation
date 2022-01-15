const form = document.querySelector('#main-form');
const formInput = document.querySelector('#main-form input');
const list = document.querySelector('#invitation-list');
const confirmCheck = document.querySelector('.invitees .form-check');
const noGuest = document.querySelector('.no-invitee');
const noConfirmation = document.querySelector('.no-confirmed');

// Check Empty Children Function
const checkEmpty = (parentElement, element1, element2, value) => {
    if (parentElement.length) {
        element1.style.display = 'none';
        element2.style.display = value;
    } else {
        element1.style.display = 'block';
        element2.style.display = 'none';
    }
}

// Set Element Function
const setElement = (element, eTarget, displayValue, iconClass, btnClass) => {
    element.style.display = displayValue;
    eTarget.innerHTML = `<i class="${iconClass}"></i>`;
    eTarget.className = `btn btn-sm btn-outline-primary ${btnClass}`;
}

// Edit Function
const editName = (div, h3, eTarget) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control form-control-sm';
    input.value = h3.textContent;
    div.insertBefore(input, h3);
    setElement(h3, eTarget, 'none', 'fas fa-save', 'save-btn');
}

// Save Function
const saveName = (h3, eTarget) => {
    const input = eTarget.closest('.single').querySelector('.invitee-name input');
    if (input.value) {
        h3.textContent = input.value;
        input.remove();
        setElement(h3, eTarget, 'block', 'bi bi-pencil-fill', 'edit-btn');
    } else {
        input.remove();
        setElement(h3, eTarget, 'block', 'bi bi-pencil-fill', 'edit-btn');
    }
}

// Accept Invitation
const acceptInvitation = (eTarget, single) => {
    if (eTarget.checked) {
        single.classList.add('border-primary')
    } else {
        single.classList.remove('border-primary')
    }
}

// Disabled Function
const disabledFunction = (element, disabledValue) => {
    const single = element.querySelector('.single');
    const editBtn = single.querySelector('.single .edit-btn');
    const removeBtn = single.querySelector('.single .delete-btn');
    const confirm = single.querySelector('.single .form-check-input');
    editBtn.disabled = removeBtn.disabled = confirm.disabled = disabledValue;
}
/*--------------------------------------
Event Listener
----------------------------------------*/
checkEmpty(list.children, noGuest, confirmCheck, 'block');

// Add Invitee
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let invitee = formInput.value;
    let markup = '';
    markup = `
    <div class="col-md-6 col-lg-4">
        <div class="single">
            <div class="d-flex justify-content-between">
                <div class="align-self-center invitee-name mb-2">
                    <h3>${invitee}</h3>
                </div>
                <div class="align-self-center mb-2">
                    <ul class="list-inline">
                        <li class="list-inline-item">
                            <button type="button" class="btn btn-sm btn-outline-primary edit-btn"><i
                                    class="bi bi-pencil-fill"></i></button>
                        </li>
                        <li class="list-inline-item">
                            <button type="button" class="btn btn-sm btn-outline-danger delete-btn"><i
                                    class="bi bi-trash-fill"></i></button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-check">
                <label class="form-check-label">
                    <input type="checkbox" class="form-check-input">Confirm
                </label>
            </div>
        </div>
    </div>
    `
    list.innerHTML += markup;
    formInput.value = '';
    checkEmpty(list.children, noGuest, confirmCheck, 'block');
});

// Edit & Delete Invitee
list.addEventListener('click', (e) => {
    let eTarget = e.target;
    const single = eTarget.closest('.single');
    const editBtn = eTarget.classList.contains('edit-btn');
    const deleteBtn = eTarget.classList.contains('delete-btn');
    const saveBtn = eTarget.classList.contains('save-btn');
    const checkBox = eTarget.classList.contains('form-check-input');
    if (single) {
        const div = single.querySelector('.invitee-name');
        const h3 = single.querySelector('.invitee-name h3');
        if (editBtn) {
            editName(div, h3, eTarget);
        } else if (saveBtn) {
            saveName(h3, eTarget);
        } else if (deleteBtn) {
            single.parentNode.remove();
            checkEmpty(list.children, noGuest, confirmCheck, 'block');
        } else if (checkBox) {
            eTarget.addEventListener('click', acceptInvitation(eTarget, single));
        }
    }
});

// Confirm Invitation
confirmCheck.addEventListener('click', (e) => {
    const eTarget = e.target;
    const listElement = list.children;
    if (eTarget.checked) {
        jQuery("#preloader").show().fadeOut(250);
        const confirmList = [...listElement].filter((element) => {
            if (!element.querySelector('.single').classList.contains('border-primary')) {
                element.style.display = 'none';
            } else {
                disabledFunction(element, true);
                return element;
            }
        });
        checkEmpty(confirmList, noConfirmation, noGuest, 'none');
    } else {
        jQuery("#preloader").show().fadeOut(250);
        noConfirmation.style.display = 'none';
        [...listElement].forEach((element) => {
            disabledFunction(element, false);
            element.style.display = 'block';
        });
    }
});