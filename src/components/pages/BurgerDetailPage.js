import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading';
import '../../assets/css/BurgerDetail.css';

const BurgerDetailPage = () => {
  const { id } = useParams();
  const [burger, setBurger] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const loadBurgerAndComments = async () => {
      try {
        const burgerResponse = await axios.get(`https://a57e29c422a5fd0e.mokky.dev/burger/${id}`);
        setBurger(burgerResponse.data);
        const commentsResponse = await axios.get('https://a57e29c422a5fd0e.mokky.dev/comments');
        const burgerComments = commentsResponse.data.filter((comment) => String(comment.postId) === String(id));
        setComments(burgerComments);
      } catch (error) {
        console.error('Ошибка:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBurgerAndComments();
  }, [id]);

  const loadComments = async () => {
    try {
      const response = await axios.get('https://a57e29c422a5fd0e.mokky.dev/comments');
      const burgerComments = response.data.filter((comment) => String(comment.postId) === String(id));
      setComments(burgerComments);
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
      const commentUrl = 'https://a57e29c422a5fd0e.mokky.dev/comments';
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

  if (!burger) {
    return <div className="not-found">Бургер не найден</div>;
  }

  return (
    <div className="burger-detail">
      <Link to="/" className="back-btn-link">
        <button className="back-btn">
          ← Назад
        </button>
      </Link>
      
      <div className="burger-detail-content">
        <div className="burger-image">
          <img src={burger.img} alt={burger.name} />
        </div>
        
        <div className="burger-info">
          <h1>{burger.name}</h1>
          <p className="burger-description">{burger.descriptions}</p>
          <p className="burger-mass">Вес: {burger.mass} г</p>
          <p className="burger-price">{burger.price} ₸</p>
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

export default BurgerDetailPage;
