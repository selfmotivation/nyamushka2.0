const getCardsData = async(url) => {
  const res = await fetch(url);
  const data = await res.json();
  
  return data;
};

const createCards = (cardData) => {
  const cards = cardData.
    map(card => {
    return `<div class="food-item${card.isOver ? ' is_over' : ''}">
      <div class="food-card default">
        <div class="food-card__text">
          <p class="food-card__description">Сказочное заморское яство</p>
          <p class="food-card__title">Нямушка</p>
          <p class="food-card__taste">${card.taste}</p>
          <p class="food-card__contains"><span class="food-card__contains-quantity">${card.portionsQuantity} </span>порций<br>${card.mice} в подарок${card.isCustomerSatisfied ? '<br>заказчик доволен' : ''}</p>
        </div>
          <img class="food-card__cat-bg" src="img/cat-bg.png">
          <div class="food-card__weight">${card.weight}<br><span class="food-card__weight-kg">кг</span></div>
      </div>
      <p class="food-item__subscription">
        ${card.isOver ?
          'Печалька, '+card.taste+' закончился.' :
          'Чего сидишь? Порадуй котэ, <span class="food-item__subscription-buy">купи</span>.</p>'
        }
    </div>`
    }).join('');
    
    document.querySelector('.food-promo').innerHTML += cards;

    const buySubscriptionButton = document.querySelectorAll('.food-item__subscription-buy');
    buySubscriptionButton.forEach(btn => {
    btn.addEventListener('click', () => changeCardColorByText(btn));
    btn.addEventListener('click', () => changeSubscriptionByText(btn, cardData));
  });
}

const addHoverEffect = (card) => {
  if (card.classList.contains('chosen')) {
    const cardDescription = card.querySelector('.food-card__description');
    cardDescription.innerHTML = "Котэ не одобряет?";
    cardDescription.classList.add('unchose');
  }

  card.classList.add('hover');
}

const removeHoverEffect = (card) => {
  const cardDescription = card.querySelector('.food-card__description');
  cardDescription.innerHTML = 'Сказочное заморское яство';
  cardDescription.classList.remove('unchose');
  
  card.classList.remove('hover');
}

const changeCardOrderState = (card, cardsData, e) => {
  if (e.currentTarget.classList.contains('food-card')) {
    const cardDescription = card.querySelector('.food-card__description');
    cardDescription.classList.remove('unchose');
    
    if (card.classList.contains('chosen')) {
      cardDescription.innerHTML = 'Сказочное заморское яство';
    }

    card.classList.toggle('chosen');
    card.classList.remove('hover');

    const taste = card.querySelector('.food-card__taste').innerHTML;
    const subscription = card.nextElementSibling;
    
    if (card.classList.contains('chosen')) {
      cardsData.forEach(cardData => {
        if (cardData.taste === taste) subscription.innerHTML = `${cardData.descriptionIfOrdered}`;
      });
    } else {
      subscription.innerHTML = 'Чего сидишь? Порадуй котэ, <span class="food-item__subscription-buy">купи</span>.';
      const buyTextButton = subscription.querySelector('.food-item__subscription-buy');
      buyTextButton.addEventListener('click', () => changeCardColorByText(buyTextButton));
      buyTextButton.addEventListener('click', () => changeSubscriptionByText(buyTextButton, cardsData));
    }
  }

  if (e.currentTarget.classList.contains('food-item__subscription-buy')) {
    changeCardColorByText(e.currentTarget);
  }
}

const changeCardColorByText = (buyTextButton) => {
  buyTextButton.parentElement.previousElementSibling.classList.toggle('chosen');
}

const changeSubscriptionByText = (buyTextButton, cardsData) => {
  const taste = buyTextButton.parentElement.previousElementSibling.querySelector('.food-card__taste').innerHTML;
  const subscription = buyTextButton.parentElement;
  if (subscription.previousElementSibling.classList.contains('chosen')) {
    cardsData.forEach(cardData => {
      if (cardData.taste === taste) subscription.innerHTML = `${cardData.descriptionIfOrdered}`;
    });
  }
}

const checkIfOutOfStock = (cards, cardsData) => {
  cards.forEach(card => {
    if (card.parentElement.classList.contains('is_over')) {
      card.nextElementSibling.innerHTML = `Печалька, ${card.querySelector('.food-card__taste').innerHTML} закончился.`;
    } else {
      card.addEventListener('mouseenter', () => addHoverEffect(card));
      card.addEventListener('mouseleave', () => removeHoverEffect(card));
      card.addEventListener('click', (e) => changeCardOrderState(card, cardsData, e));
    }
  });
}



document.addEventListener('DOMContentLoaded', async () => {
  const cardsData = await getCardsData(`../cards-data.json`);
  
  createCards(cardsData);

  const foodCards = document.querySelectorAll('.food-card');
  
  checkIfOutOfStock(foodCards, cardsData);
})