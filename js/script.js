// Изменение цвета рамки и фона кружка с весом корма

function changeCardColor() {
	this.classList.toggle('chosen');
	this.classList.toggle('default');
	this.classList.add('current');
	const cardDescription = this.querySelector('.food-card__description');
	cardDescription.innerHTML = "Сказочное заморское яство";
	cardDescription.classList.remove('unchose');
}

function changeCardColorByText() {
	this.parentElement.previousElementSibling.classList.toggle('chosen');
	this.parentElement.previousElementSibling.classList.toggle('default');
}

const foodCards = document.querySelectorAll('.food-card');

foodCards.forEach(card => {
	if (card.parentElement.classList.contains('is_over')) {
		card.nextElementSibling.innerHTML = `Печалька, ${card.querySelector('.food-card__taste').innerHTML} закончился.`;
	} else {
		card.addEventListener('click', changeCardColor);
		card.addEventListener('mouseleave', removeUnhoveredClass);
		card.addEventListener('mouseenter', changeDescriptionText);
		card.addEventListener('click', changeSubscription);
	}
});

// Сохранение состояния карточки после клика, "неприменение" :hover

function removeUnhoveredClass() {
	this.classList.remove('current');
	let cardDescription = this.querySelector('.food-card__description');
	cardDescription.innerHTML = "Сказочное заморское яство";
	cardDescription.classList.remove('unchose');
}

// Изменение верхней подписи на карточке

function changeDescriptionText() {
	if (this.classList.contains('chosen')) {
		let cardDescription = this.querySelector('.food-card__description');
		cardDescription.innerHTML = "Котэ не одобряет?";
		cardDescription.classList.add('unchose');
	}
}

let chosenFoodCards = document.querySelectorAll('.chosen');
chosenFoodCards.forEach(function(elem){
	elem.addEventListener('mouseenter', changeDescriptionText);
	elem.addEventListener('mouseleave', removeUnhoveredClass);
});

// Изменение цвета рамки и фона кружка с весом корма при нажатии по "купи"

let buySubscriptionButton = document.querySelectorAll('.food-item__subscription-buy');
buySubscriptionButton.forEach(function(elem){
	elem.addEventListener('click', changeCardColorByText);
	elem.addEventListener('click', changeSubscriptionByText);
})


// for (let i=0;i<=(foodCards.length-1);i++) {
// 	foodCards[i].addEventListener('change', changeSubscription);
// }

// Изменения текста подписи под карточкой

function changeSubscription() {
	let taste = this.querySelector('.food-card__taste').innerHTML;
	let subscription = this.nextElementSibling;
	if (this.classList.contains('chosen')) {
		if (taste == "с фуа-гра") {
			subscription.innerHTML = "Печень утки разварная с артишоками.";
		} else if (taste == "с рыбой") {
			subscription.innerHTML = "Головы щучьи с чесноком да свежайшая сёмгушка.";
		} else if (taste == "с курой") {
			subscription.innerHTML = "Филе из цыплят с трюфелями в бульоне.";
		}
	} else {
		if (taste == "с фуа-гра") {
			subscription.innerHTML = "Чего сидишь? Порадуй котэ, <span>купи</span>.";
		} else if (taste == "с рыбой") {
			subscription.innerHTML = "Чего сидишь? Порадуй котэ, <span>купи</span>.";
		} else if (taste == "с курой") {
			subscription.innerHTML = "Чего сидишь? Порадуй котэ, <span>купи</span>.";
		}
		subscription.querySelector('span').classList.add('food-item__subscription-buy');
		subscription.querySelector('.food-item__subscription-buy').addEventListener('click', changeCardColorByText);
		subscription.querySelector('.food-item__subscription-buy').addEventListener('click', changeSubscriptionByText);
	}
}

function changeSubscriptionByText() {
	let taste = this.parentElement.previousElementSibling.querySelector('.food-card__taste').innerHTML;
	let subscription = this.parentElement;
	if (subscription.previousElementSibling.classList.contains('chosen')) {
		if (taste == "с фуа-гра") {
			subscription.innerHTML = "Печень утки разварная с артишоками.";
		} else if (taste == "с рыбой") {
			subscription.innerHTML = "Головы щучьи с чесноком да свежайшая сёмгушка.";
		} else if (taste == "с курой") {
			subscription.innerHTML = "Филе из цыплят с трюфелями в бульоне.";
		}
	}
}

let foodItems = document.querySelectorAll('.food-item');






















// let foodItems = document.querySelectorAll('.food-item');
// foodItems.forEach(function(elem) {
// 	let foodCard = elem.querySelector('.food-card');
// 	let buySubscriptionButton = elem.querySelector('.food-item__subscription-buy');
// 	buySubscriptionButton.addEventListener('click', changeCardColor);
// 	foodCard.addEventListener('click', changeCardColor);
// 	// foodCard.addEventListener('mouseleave', removeUnhoveredClass);
// 	// foodCard.addEventListener('mouseenter', changeDescriptionText);

// 	// elem.addEventListener('click', функция для смены надписи)
// })
// // Изменение цвета рамки и фона кружка с весом корма

// function changeCardColor() {
// 		foodCard.classList.toggle('chosen');
// 		foodCard.classList.toggle('default');
// 		foodCard.classList.add('current');
	
	
// 	// let cardDescription = this.querySelector('.food-card__description');
// 	// cardDescription.innerHTML = "Сказочное заморское яство";
// 	// cardDescription.classList.remove('unchose');
// }

// Сохранение состояния карточки после клика, "неприменение" :hover

// function removeUnhoveredClass() {
// 	this.classList.remove('current');
// 	let cardDescription = this.querySelector('.food-card__description');
// 	cardDescription.innerHTML = "Сказочное заморское яство";
// 	cardDescription.classList.remove('unchose');
// }

// // Изменение верхней подписи на карточке

// function changeDescriptionText() {
// 	if (this.classList.contains('chosen')) {
// 		let cardDescription = this.querySelector('.food-card__description');
// 		cardDescription.innerHTML = "Котэ не одобряет?";
// 		cardDescription.classList.add('unchose');
// 	}
// }

// let chosenFoodCards = document.querySelectorAll('.chosen');
// chosenFoodCards.forEach(function(elem){
// 	elem.addEventListener('mouseenter', changeDescriptionText);
// 	elem.addEventListener('mouseleave', removeUnhoveredClass);
// });





