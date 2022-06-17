let cardsData;
(async function getCardsData() {
  await fetch(`../cards-data.json`)
  .then(res => res.json())
  .then(data => cardsData = data);
  console.log(cardsData);
}()
.then(() => {
  const createCard = (cardData) => {
    const card = `
      <div class="food-item${cardData.isOver ? ' is_over' : ''}">
      <div class="food-card default">
        <div class="food-card__text">
          <p class="food-card__description">Сказочное заморское яство</p>
          <p class="food-card__title">Нямушка</p>
          <p class="food-card__taste">${cardData.taste}</p>
          <p class="food-card__contains"><span class="food-card__contains-quantity">${cardData.portionsQuantity} </span>порций<br>${cardData.mice} в подарок${cardData.isCustomerSatisfied ? '<br>заказчик доволен' : ''}</p>
        </div>
          <img class="food-card__cat-bg" src="img/cat-bg.png">
          <div class="food-card__weight">${cardData.weight}<br><span class="food-card__weight-kg">кг</span></div>
        </div>
      <p class="food-item__subscription">
        ${cardData.isOver ?
          'Печалька, '+cardData.taste+' закончился.' :
          'Чего сидишь? Порадуй котэ, <span class="food-item__subscription-buy">купи</span>.</p>'
        }
    </div>`
  
    return card;
  }
  
  
  const createAllCards = () => {
    const cardsList = [];
    
    cardsData.forEach(card => {
      cardsList.push(createCard(card));
    });
  
    document.querySelector('.food-promo').innerHTML += cardsList.join('');
  }
  
  createAllCards();
  
  
  const foodCards = document.querySelectorAll('.food-card');
  
  foodCards.forEach(card => {
    if (card.parentElement.classList.contains('is_over')) {
      card.nextElementSibling.innerHTML = `Печалька, ${card.querySelector('.food-card__taste').innerHTML} закончился.`;
    } else {
      card.addEventListener('mouseenter', addHoverEffect);
      card.addEventListener('mouseleave', removeHoverEffect);
      card.addEventListener('click', changeCardOrderState);
    }
  });
  
  function addHoverEffect() {
    if (this.classList.contains('chosen')) {
      const cardDescription = this.querySelector('.food-card__description');
      cardDescription.innerHTML = "Котэ не одобряет?";
      cardDescription.classList.add('unchose');
    }

    this.classList.add('hover');
  }

  function removeHoverEffect() {
    const cardDescription = this.querySelector('.food-card__description');
    cardDescription.innerHTML = 'Сказочное заморское яство';
    cardDescription.classList.remove('unchose');
    
    this.classList.remove('hover');
  }

  function changeCardOrderState() {
    const cardDescription = this.querySelector('.food-card__description');
    cardDescription.classList.remove('unchose');
    
    if (this.classList.contains('chosen')) {
      cardDescription.innerHTML = 'Сказочное заморское яство';
    }

    this.classList.toggle('chosen');
    this.classList.remove('hover');

    const taste = this.querySelector('.food-card__taste').innerHTML;
    const subscription = this.nextElementSibling;
    
    if (this.classList.contains('chosen')) {
      cardsData.forEach(cardData => {
        if (cardData.taste === taste) subscription.innerHTML = `${cardData.descriptionIfOrdered}`;
      });
    } else {
      subscription.innerHTML = 'Чего сидишь? Порадуй котэ, <span>купи</span>.';
      subscription.querySelector('span').classList.add('food-item__subscription-buy');
      subscription.querySelector('.food-item__subscription-buy').addEventListener('click', changeCardColorByText);
      subscription.querySelector('.food-item__subscription-buy').addEventListener('click', changeSubscriptionByText);
    }
  }

  function changeCardColorByText() {
    this.parentElement.previousElementSibling.classList.toggle('chosen');
  }
  
  function changeSubscriptionByText() {
    const taste = this.parentElement.previousElementSibling.querySelector('.food-card__taste').innerHTML;
    const subscription = this.parentElement;
    if (subscription.previousElementSibling.classList.contains('chosen')) {
      cardsData.forEach(cardData => {
        if (cardData.taste === taste) subscription.innerHTML = `${cardData.descriptionIfOrdered}`;
      });
    }
  }

  const buySubscriptionButton = document.querySelectorAll('.food-item__subscription-buy');
  buySubscriptionButton.forEach(function(btn){
    btn.addEventListener('click', changeCardColorByText);
    btn.addEventListener('click', changeSubscriptionByText);
  })
}));