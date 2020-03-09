const MAIN_DOMAIN = 'https://nesteruk-shop-application.herokuapp.com';
//const MAIN_DOMAIN = 'http://localhost:4000';
$('#category li').on('click', function(){
    if($(this).closest('li').hasClass('tab-2')){
        fetch(MAIN_DOMAIN + '/api/category/', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(body => {
                let sel = document.querySelector('#category-edit .edit-select-category');
                sel.innerHTML = '';    
                body.forEach(value => {
                    let option = document.createElement('option');
                    option.value = value.name;
                    option.innerHTML = value.name;
                    sel.appendChild(option);
                })
            }).catch(error => {
                console.log(error);
            });
    }

    if($(this).closest('li').hasClass('tab-3')){
         fetch(MAIN_DOMAIN + '/api/category/', {
             method: 'GET',
             credentials: 'include',
             headers: { 'Content-Type': 'application/json' }
         })
             .then(res => res.json())
             .then(body => {
                let sel = document.querySelector('#category-delete .delete-select-category');    
                sel.innerHTML = '';
                body.forEach(value => {
                    let option = document.createElement('option');
                    option.value = value.name;
                    option.innerHTML = value.name;
                    sel.appendChild(option);
                })
            }).catch(error => {
                console.log(error);
            });
     }
});

$('#producer li').on('click', function(){
    if($(this).closest('li').hasClass('tab-2')){
        fetch(MAIN_DOMAIN + '/api/producer/', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(body => {
                let sel = document.querySelector('#producer-edit .edit-select-producer');
                sel.innerHTML = '';    
                body.forEach(value => {
                    let option = document.createElement('option');
                    option.value = value.name;
                    option.innerHTML = value.name;
                    sel.appendChild(option);
                })
            }).catch(error => {
                console.log(error);
            });
    }

    if($(this).closest('li').hasClass('tab-3')){
         fetch(MAIN_DOMAIN + '/api/producer/', {
             method: 'GET',
             credentials: 'include',
             headers: { 'Content-Type': 'application/json' }
         })
             .then(res => res.json())
             .then(body => {
                let sel = document.querySelector('#producer-delete .delete-select-producer');    
                sel.innerHTML = '';
                body.forEach(value => {
                    let option = document.createElement('option');
                    option.value = value.name;
                    option.innerHTML = value.name;
                    sel.appendChild(option);
                })
            }).catch(error => {
                console.log(error);
            });
     }
});

$('#main-tabs li').on('click', function(){
    console.log(this);
    if($(this).closest('li').hasClass('tab-3')){
        fetch(MAIN_DOMAIN + '/api/category/', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(body => {
                console.log(body);
                let selAddCategory = document.querySelector('#product-add .name-category');
                let selEditCategory = document.querySelector('#product-edit .name-category');
                selAddCategory.innerHTML = '';
                selEditCategory.innerHTML = '';    
                body.forEach(value => {
                    let optionAdd = document.createElement('option');
                    let optionEdit = document.createElement('option');
                    optionAdd.value = value.name;
                    optionAdd.innerHTML = value.name;
                    optionEdit.value = value.name;
                    optionEdit.innerHTML = value.name;
                    selAddCategory.appendChild(optionAdd);
                    selEditCategory.appendChild(optionEdit);
                })
            }).then(()=>{
                return fetch(MAIN_DOMAIN + '/api/producer/', {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' }
                });
            })
            .then(res => res.json())
            .then(body => {
               let selAddProducer = document.querySelector('#product-add .name-producer')
               let selEditProducer = document.querySelector('#product-edit .name-producer');   
               selAddProducer.innerHTML = '';
               selEditProducer.innerHTML = '';
               body.forEach(value => {
                let optionAdd = document.createElement('option');
                let optionEdit = document.createElement('option');
                optionAdd.value = value.name;
                optionAdd.innerHTML = value.name;
                optionEdit.value = value.name;
                optionEdit.innerHTML = value.name;
                   selAddProducer.appendChild(optionAdd);
                   selEditProducer.appendChild(optionEdit);
               })
            })   
            .catch(error => {
                console.log(error);
            });
    }
});

$(function() {
    let init = () => {
        initBuyBtn();
        initDelBtn();
        showShoppingCartInfo();
        initUserProfileBtn();
        initEditBtn();

        $('#addToCart').click(addProductToCart);
        $('#remove-product').click(removeProductFromShoppingCart);
        $('#remove-order').click(removeUserOrder);
        $('#add-product-image').change(imagePreviewAdd);
        $('#user-profile-save').click(saveProfileInfo)
        $('#products-list-edit-btn').click(editProductInfo);
    };

    let editProductInfo = function() {
        let id = $(this).attr('data-id-product');
        let navTabs = document.querySelectorAll('#product .nav-tabs-item'),
            tabContents = document.querySelectorAll('#product .tab-pane'),
            tabName= 'tab-3';

            navTabs.forEach(item => {
                item.classList.remove('active');
            });
            navTabs.forEach(item => {
                if(item.classList.contains(tabName)){
                    item.classList.add('active');
                } 
            });

            tabContents.forEach(item => {
                item.classList.contains(tabName) ? item.classList.add('active') : item.classList.remove('active');
            });
        fetch(MAIN_DOMAIN + '/api/products/' + id, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(body => {
                document.querySelector('#product-edit .product-name').value = body.name;
                document.querySelector('#product-edit .product-price').value = body.price;
                document.querySelector('#product-edit .product-count').value = body.count;
                document.querySelector('#product-edit .product-description').value = body.description;
                document.querySelector('#product-edit .product-image').src = 'http://localhost:4000' + body.image;
                $('#product-edit .image-preview-default-text').hide();
                $('#product-edit .product-image').show();
                
            });
    }

    const imagePreviewAdd = function () {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = viewer.load;
        reader.readAsDataURL(file);
        $('#form-add-product .image-preview-default-text').hide();
        $('#form-add-product .product-image').show();
    };

    const viewer = {
        load: function (e) {
            $('#form-add-product .product-image').attr('src', e.target.result);
        },
        loadEdit: function (e) {
            $('#form-edit-product .product-edit-image').attr('src', e.target.result);
        }
    }

    let saveProfileInfo = function(){
        let formData = new FormData();
        const password = document.querySelector('#edit .profile-password').value;
        const confirmPassword = document.querySelector('#edit .profile-confirm-password').value;
        const image = document.querySelector('#upload-user-image').files[0];
        if(image!=undefined){
            formData.append('image', image);
        }
        if(password.length > 0 && password !== confirmPassword){
            document.querySelector('#edit .alert-danger').style.display = 'block';
            document.querySelector('#edit .error-message').textContent = 'Password isn\'t math';
            return;
        }else{
            if(password.length > 0){
                formData.append('password', password);
            }
        }
        const firstName = document.querySelector('#edit .profile-firstName').value;
        const lastName = document.querySelector('#edit .profile-lastName').value;
        const email = document.querySelector('#edit .profile-email').value;
        const phone = document.querySelector('#edit .profile-phone').value;
        const street = document.querySelector('#edit .profile-street').value;
        const city = document.querySelector('#edit .profile-city').value;
        const name = document.querySelector('#edit .profile-name').value;
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('street', street);
        formData.append('city', city);
        formData.append('name', name);
        console.log(formData);
        fetch('/api/me', {
            method: 'PATCH',
            credentials: 'include',
            body: formData,
        }).then(res => {
            console.log(res);
            return res.json()
        }).then(body => {
            console.log(body);
            if(body.status !== 200){
                    throw new Error(body.error);
            }
            document.querySelector('#edit .profile-firstName').value = body.user.firstName;
            document.querySelector('#edit .profile-lastName').value = body.user.lastName;
            document.querySelector('#edit .profile-email').value = body.user.email;
            document.querySelector('#edit .profile-phone').value = body.user.phone;
            document.querySelector('#edit .profile-street').value = body.user.address.street;
            document.querySelector('#edit .profile-city').value = body.user.address.city;
            document.querySelector('#edit .profile-name').value = body.user.name;
            document.querySelector('#user-image .user-image-class').src = body.user.image;
            document.querySelector('#user-image .label-info').textContent = '';
            document.querySelector('#edit .alert-success').style.display = 'block';
            document.querySelector('#edit .success-message').textContent = 'Profile updated!';
        }).catch(error => {
            console.log(error);
            document.querySelector('#edit .alert-danger').style.display = 'block';
            document.querySelector('#edit .error-message').textContent = error.message;
        });
    };

    let initUserProfileBtn = () => {
        $('.user-profile-save').click(saveProfileInfo);
    }

    let initBuyBtn = function() {
        $('.buy-btn').click(addProductToCart);
    };

    let initEditBtn = () => {
        $('#products-list .products-list-edit-btn').click(editProductInfo);
    }

    let initDelBtn = function() {
        $('.remove-product').click(removeProductFromShoppingCart);
        $('.remove-order').click(removeUserOrder);
    };

    let addProductToCart = function() {
        let id = $(this).attr('data-id-product');
        console.log(id);
        const postData = {
            id,
            count: 1
        };
        fetch(MAIN_DOMAIN + '/api/shopping-cart', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(postData),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(body => {
                document.querySelector('#currentShoppingCart').style.display =
                    'block';
                refreshShoppingCartInfo(body);
            });
    };

    let showShoppingCartInfo = () => {
        fetch(MAIN_DOMAIN + '/api/shopping-cart', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(body => {
                if (body.totalCount > 0) {
                    document.querySelector(
                        '#currentShoppingCart'
                    ).style.display = 'block';
                    refreshShoppingCartInfo(body);
                }
            });
    };

    let removeProductFromShoppingCart = function() {
        let id = $(this).attr('data-id-product');
        let count = $(this).attr('data-count');
        const deleteData = {
            id,
            count
        };
        fetch(MAIN_DOMAIN + '/api/shopping-cart', {
            method: 'DELETE',
            credentials: 'include',
            body: JSON.stringify(deleteData),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(body => {
                refreshShoppingCartInfo(body);
                location.reload();
            });
    };

    let removeUserOrder = async function() {
        const id = $(this).attr('data-id-order');
        fetch('/api/order/' + id, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(body => {
                if (body.message) {
                    const message = document.querySelector(
                        '#user-orders .message'
                    );
                    message.style.display = 'block';
                    message.textContent = body.message;
                } else {
                    const error = document.querySelector('#user-orders .error');
                    error.style.display = 'block';
                    error.textContent = body.message;
                }
            });
    };

    let refreshShoppingCartInfo = data => {
        let tCost = document.querySelector('#currentShoppingCart .total-cost');
        tCost.textContent = data.totalCost;
        let tCount = document.querySelector(
            '#currentShoppingCart .total-count'
        );
        tCount.textContent = data.totalCount;
        let tCountHeader = document.querySelector(
            '#currentShoppingCart .total-count-header'
        );
        tCountHeader.textContent = data.totalCount;
    };

    init();
});
