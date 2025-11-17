import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading';
import '../../assets/css/DrinkDetail.css';

const DrinkDetailPage = () => {
  const { id } = useParams();
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const loadDrinkAndComments = async () => {
      try {
        const drinkResponse = await axios.get(`https://a57e29c422a5fd0e.mokky.dev/drinks/${id}`);
        setDrink(drinkResponse.data);
        const commentsResponse = await axios.get('https://a57e29c422a5fd0e.mokky.dev/drinkscomment');
        const drinkComments = commentsResponse.data.filter((comment) => String(comment.postId) === String(id));
        setComments(drinkComments);
      } catch (error) {
        console.error('Ошибка:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDrinkAndComments();
  }, [id]);

  const loadComments = async () => {
    try {
      const response = await axios.get('https://a57e29c422a5fd0e.mokky.dev/drinkscomment');
      const drinkComments = response.data.filter((comment) => String(comment.postId) === String(id));
      setComments(drinkComments);
    } catch (error) {
      console.error('Ошибка загрузки комментариев:', error);
    }
  };

  const SubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      setSubmitMessage("Комментарий не может быть пустым");
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage("Отправка комментария...");

    try {
      const commentUrl = 'https://a57e29c422a5fd0e.mokky.dev/drinkscomment';
      const commentData = {
        postId: id,
        text: commentText,
        createdAt: new Date().toISOString()
      };

      const response = await axios.post(commentUrl, commentData);

      if (response.status === 201 || response.status === 200) {
        setSubmitMessage('Успешно отправлено!');
        setCommentText('');
        loadComments();
      } else {
        setSubmitMessage('Ошибка при отправке комментария!');
      }
    } catch (error) {
      console.error(error);
      setSubmitMessage('Ошибка при отправке комментария!');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!drink) {
    return <div className="not-found">Напиток не найден</div>;
  }

  return (
    <div className="drink-detail">
      <Link to="/drinks" className="back-btn-link">
        <button className="back-btn">
          ← Назад
        </button>
      </Link>
      
      <div className="drink-detail-content">
        <div className="drink-image">
          <img src={drink.img} alt={drink.name} />
        </div>
        
        <div className="drink-info">
          <h1>{drink.name}</h1>
          <p className="drink-description">{drink.descriptions}</p>
          <p className="drink-liter">Объем: {drink.liter} л</p>
          <p className="drink-price">{drink.price} ₸</p>
        </div>
      </div>

      <div className="comments-section">
        <h2>Комментарии</h2>
        
        <form onSubmit={SubmitComment} className="comment-form">
          <label htmlFor="comment">Введите комментарий</label>
          <input 
            type="text" 
            id="comment" 
            value={commentText} 
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Ваш комментарий..."
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Отправить'}
          </button>
        </form>
        
        {submitMessage && <p className="submit-message">{submitMessage}</p>}

        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <p className="comment-text">{comment.text}</p>
                <p className="comment-date">
                  {new Date(comment.createdAt).toLocaleString('ru-RU')}
                </p>
              </div>
            ))
          ) : (
            <p className="no-comments">Пусто</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrinkDetailPage;
