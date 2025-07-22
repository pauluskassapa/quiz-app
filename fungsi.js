const questions = [
            {
                question: "Apa ibu kota Indonesia?",
                options: ["Jakarta", "Surabaya", "Bandung", "Medan"],
                correct: 0
            },
            {
                question: "Siapa presiden pertama Indonesia?",
                options: ["Soeharto", "Soekarno", "B.J. Habibie", "Megawati"],
                correct: 1
            },
            {
                question: "Planet terbesar dalam tata surya kita adalah?",
                options: ["Saturnus", "Mars", "Jupiter", "Neptunus"],
                correct: 2
            },
            {
                question: "Berapa hasil dari 15 x 8?",
                options: ["120", "130", "110", "140"],
                correct: 0
            },
            {
                question: "Bahasa pemrograman yang dikembangkan oleh Guido van Rossum adalah?",
                options: ["Java", "Python", "JavaScript", "C++"],
                correct: 1
            },
            {
                question: "Benua terbesar di dunia adalah?",
                options: ["Afrika", "Amerika", "Asia", "Eropa"],
                correct: 2
            },
            {
                question: "Organ tubuh manusia yang memproduksi insulin adalah?",
                options: ["Hati", "Ginjal", "Pankreas", "Jantung"],
                correct: 2
            },
            {
                question: "Tahun kemerdekaan Indonesia adalah?",
                options: ["1944", "1945", "1946", "1947"],
                correct: 1
            },
            {
                question: "Gas yang paling banyak di atmosfer bumi adalah?",
                options: ["Oksigen", "Nitrogen", "Karbon dioksida", "Argon"],
                correct: 1
            },
            {
                question: "Penulis novel 'Laskar Pelangi' adalah?",
                options: ["Pramoedya Ananta Toer", "Andrea Hirata", "Tere Liye", "Habiburrahman El Shirazy"],
                correct: 1
            }
        ];

        // Variabel global
        let currentQuestion = 0;
        let score = 0;
        let selectedAnswer = null;
        let userAnswers = [];
        let isAnswered = false;

        // Fungsi untuk memulai quiz
        function startQuiz() {
            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('quizScreen').style.display = 'block';
            currentQuestion = 0;
            score = 0;
            userAnswers = [];
            showQuestion();
        }

        // Fungsi untuk menampilkan pertanyaan
        function showQuestion() {
            isAnswered = false;
            selectedAnswer = null;
            
            const question = questions[currentQuestion];
            document.getElementById('question').textContent = question.question;
            document.getElementById('questionCounter').textContent = `Pertanyaan ${currentQuestion + 1} dari ${questions.length}`;
            document.getElementById('score').textContent = `Skor: ${score}`;
            
            // Update progress bar
            const progress = ((currentQuestion) / questions.length) * 100;
            document.getElementById('progress').style.width = progress + '%';
            
            // Tampilkan opsi jawaban
            const optionsContainer = document.getElementById('options');
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.textContent = option;
                optionElement.onclick = () => selectAnswer(index, optionElement);
                optionsContainer.appendChild(optionElement);
            });
            
            // Disable tombol next
            document.getElementById('nextBtn').disabled = true;
            document.getElementById('nextBtn').textContent = 'Pilih Jawaban Dulu';
        }

        // Fungsi untuk memilih jawaban
        function selectAnswer(answerIndex, optionElement) {
            if (isAnswered) return;
            
            selectedAnswer = answerIndex;
            
            // Reset semua opsi
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Tandai opsi yang dipilih
            optionElement.classList.add('selected');
            optionElement.classList.add('pulse');
            
            // Enable tombol next
            document.getElementById('nextBtn').disabled = false;
            document.getElementById('nextBtn').textContent = 'Konfirmasi Jawaban';
        }

        // Fungsi untuk pertanyaan selanjutnya
        function nextQuestion() {
            if (!isAnswered && selectedAnswer !== null) {
                // Tampilkan jawaban yang benar/salah
                showAnswerResult();
                isAnswered = true;
                
                // Simpan jawaban user
                userAnswers.push({
                    question: questions[currentQuestion].question,
                    userAnswer: selectedAnswer,
                    correctAnswer: questions[currentQuestion].correct,
                    options: questions[currentQuestion].options
                });
                
                document.getElementById('nextBtn').textContent = 
                    currentQuestion === questions.length - 1 ? 'Lihat Hasil' : 'Pertanyaan Selanjutnya';
            } else if (isAnswered) {
                currentQuestion++;
                
                if (currentQuestion < questions.length) {
                    showQuestion();
                } else {
                    showResult();
                }
            }
        }

        // Fungsi untuk menampilkan hasil jawaban
        function showAnswerResult() {
            const options = document.querySelectorAll('.option');
            const correctAnswer = questions[currentQuestion].correct;
            
            options.forEach((option, index) => {
                if (index === correctAnswer) {
                    option.classList.add('correct');
                } else if (index === selectedAnswer && index !== correctAnswer) {
                    option.classList.add('incorrect');
                }
                option.style.pointerEvents = 'none';
            });
            
            if (selectedAnswer === correctAnswer) {
                score += 10;
                document.getElementById('score').textContent = `Skor: ${score}`;
            }
        }

        // Fungsi untuk menampilkan hasil akhir
        function showResult() {
            document.getElementById('quizScreen').style.display = 'none';
            document.getElementById('resultScreen').style.display = 'block';
            document.getElementById('resultScreen').classList.add('show');
            
            const correctCount = userAnswers.filter(answer => 
                answer.userAnswer === answer.correctAnswer
            ).length;
            const wrongCount = questions.length - correctCount;
            const percentage = Math.round((correctCount / questions.length) * 100);
            
            document.getElementById('finalScore').textContent = `${correctCount}/${questions.length}`;
            document.getElementById('correctAnswers').textContent = correctCount;
            document.getElementById('wrongAnswers').textContent = wrongCount;
            document.getElementById('percentage').textContent = percentage + '%';
            
            // Pesan berdasarkan skor
            let message = '';
            let scoreColor = '';
            
            if (percentage >= 90) {
                message = '🌟 Luar biasa! Anda sangat menguasai materi!';
                scoreColor = '#28a745';
            } else if (percentage >= 70) {
                message = '👍 Bagus! Pengetahuan Anda cukup baik!';
                scoreColor = '#ffc107';
            } else if (percentage >= 50) {
                message = '📚 Tidak buruk, tapi masih bisa ditingkatkan!';
                scoreColor = '#fd7e14';
            } else {
                message = '💪 Semangat! Terus belajar untuk hasil yang lebih baik!';
                scoreColor = '#dc3545';
            }
            
            document.getElementById('resultMessage').textContent = message;
            document.getElementById('finalScore').style.color = scoreColor;
        }

        // Fungsi untuk mengulang quiz
        function restartQuiz() {
            document.getElementById('resultScreen').style.display = 'none';
            document.getElementById('resultScreen').classList.remove('show');
            document.getElementById('startScreen').style.display = 'block';
        }

        // Fungsi untuk menampilkan review
        function showReview() {
            document.getElementById('resultScreen').style.display = 'none';
            document.getElementById('reviewScreen').style.display = 'block';
            
            const reviewContent = document.getElementById('reviewContent');
            reviewContent.innerHTML = '';
            
            userAnswers.forEach((answer, index) => {
                const reviewItem = document.createElement('div');
                reviewItem.style.cssText = `
                    margin-bottom: 20px;
                    padding: 15px;
                    border-radius: 10px;
                    background: #f8f9fa;
                    border-left: 5px solid ${answer.userAnswer === answer.correctAnswer ? '#28a745' : '#dc3545'};
                `;
                
                reviewItem.innerHTML = `
                    <h4 style="color: #333; margin-bottom: 10px;">Pertanyaan ${index + 1}</h4>
                    <p style="margin-bottom: 10px;"><strong>${answer.question}</strong></p>
                    <p style="color: ${answer.userAnswer === answer.correctAnswer ? '#28a745' : '#dc3545'};">
                        Jawaban Anda: ${answer.options[answer.userAnswer]}
                    </p>
                    <p style="color: #28a745;">
                        Jawaban Benar: ${answer.options[answer.correctAnswer]}
                    </p>
                `;
                
                reviewContent.appendChild(reviewItem);
            });
        }

        // Fungsi untuk kembali ke hasil
        function backToResult() {
            document.getElementById('reviewScreen').style.display = 'none';
            document.getElementById('resultScreen').style.display = 'block';
        }