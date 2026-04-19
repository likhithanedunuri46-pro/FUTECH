<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Deal Intelligence Agent</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header h1 {
            font-size: 24px;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .logout-btn {
            background: white;
            color: #667eea;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: transform 0.2s;
        }

        .logout-btn:hover {
            transform: translateY(-2px);
        }

        .container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 0 20px;
        }

        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            border-bottom: 2px solid #ddd;
        }

        .tab-btn {
            background: white;
            border: none;
            padding: 12px 20px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            color: #666;
            border-bottom: 3px solid transparent;
            transition: all 0.3s;
        }

        .tab-btn.active {
            color: #667eea;
            border-bottom-color: #667eea;
        }

        .tab-content {
            display: none;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .tab-content.active {
            display: block;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: 500;
            font-size: 14px;
        }

        textarea,
        input[type="text"] {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
            font-family: Arial, sans-serif;
            resize: vertical;
        }

        textarea {
            min-height: 100px;
        }

        input[type="text"]:focus,
        textarea:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 5px rgba(102, 126, 234, 0.1);
        }

        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: transform 0.2s;
        }

        .btn:hover {
            transform: translateY(-2px);
        }

        .btn:active {
            transform: translateY(0);
        }

        .analysis-result {
            background: #f0f0f0;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
            max-height: 500px;
            overflow-y: auto;
        }

        .analysis-section {
            margin-bottom: 15px;
            background: white;
            padding: 15px;
            border-radius: 5px;
        }

        .analysis-section h3 {
            color: #667eea;
            margin-bottom: 10px;
            font-size: 16px;
        }

        .analysis-section p,
        .analysis-section ul {
            color: #333;
            font-size: 14px;
            line-height: 1.6;
        }

        .analysis-section ul {
            margin-left: 20px;
        }

        .analysis-section li {
            margin-bottom: 5px;
        }

        .score {
            font-size: 24px;
            font-weight: bold;
            color: #27ae60;
        }

        .deals-list {
            margin-top: 20px;
        }

        .deal-item {
            background: #f0f0f0;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 10px;
            border-left: 4px solid #667eea;
        }

        .deal-item h4 {
            color: #333;
            margin-bottom: 5px;
        }

        .deal-item p {
            color: #666;
            font-size: 13px;
        }

        .loading {
            text-align: center;
            color: #667eea;
            font-size: 14px;
            display: none;
        }

        .message {
            padding: 12px;
            border-radius: 5px;
            margin-top: 10px;
            display: none;
        }

        .message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Deal Intelligence Dashboard</h1>
        <div class="user-info">
            <span id="username">Welcome!</span>
            <button class="logout-btn" onclick="logout()">Logout</button>
        </div>
    </div>

    <div class="container">
        <div class="tabs">
            <button class="tab-btn active" onclick="switchTab('analyze')">Analyze Deal</button>
            <button class="tab-btn" onclick="switchTab('history')">Deal History</button>
        </div>

        <!-- Analyze Deal Tab -->
        <div id="analyze" class="tab-content active">
            <h2>Analyze Deal</h2>
            <form id="analyzeForm">
                <div class="form-group">
                    <label for="dealHistory">Deal History (past interactions, notes, emails)</label>
                    <textarea id="dealHistory" placeholder="Enter deal history..."></textarea>
                </div>

                <div class="form-group">
                    <label for="currentMeeting">Current Meeting Transcript or Notes</label>
                    <textarea id="currentMeeting" placeholder="Enter meeting notes..."></textarea>
                </div>

                <div class="form-group">
                    <label for="customerDetails">Customer Details (industry, company size, role)</label>
                    <textarea id="customerDetails" placeholder="Enter customer details..."></textarea>
                </div>

                <div class="form-group">
                    <label for="competitorInfo">Competitor Information (if mentioned)</label>
                    <textarea id="competitorInfo" placeholder="Enter competitor info..."></textarea>
                </div>

                <div class="form-group">
                    <label for="previousDeals">Previous Successful Deals (patterns and strategies)</label>
                    <textarea id="previousDeals" placeholder="Enter previous deal patterns..."></textarea>
                </div>

                <button type="submit" class="btn">Analyze Deal</button>
            </form>

            <div class="loading" id="loading">Analyzing deal...</div>
            <div class="message" id="message"></div>

            <div id="analysisResult"></div>
        </div>

        <!-- Deal History Tab -->
        <div id="history" class="tab-content">
            <h2>Deal History</h2>
            <div class="deals-list" id="dealsList">
                <p>No deals saved yet.</p>
            </div>
        </div>
    </div>

    <script>
        // Check if user is logged in
        window.addEventListener('DOMContentLoaded', () => {
            const username = sessionStorage.getItem('username');
            if (!username) {
                window.location.href = '/login.html';
            } else {
                document.getElementById('username').textContent = `Welcome, ${username}!`;
                loadDealHistory(username);
            }
        });

        function switchTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Show selected tab
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }

        document.getElementById('analyzeForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const dealData = {
                dealHistory: document.getElementById('dealHistory').value,
                currentMeeting: document.getElementById('currentMeeting').value,
                customerDetails: document.getElementById('customerDetails').value,
                competitorInfo: document.getElementById('competitorInfo').value,
                previousDeals: document.getElementById('previousDeals').value
            };

            const loading = document.getElementById('loading');
            const message = document.getElementById('message');
            const resultDiv = document.getElementById('analysisResult');

            loading.style.display = 'block';
            message.style.display = 'none';
            resultDiv.innerHTML = '';

            try {
                const response = await fetch('/api/analyze-deal', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dealData)
                });

                const analysis = await response.json();
                loading.style.display = 'none';

                // Save deal
                const username = sessionStorage.getItem('username');
                await saveDeal(username, analysis);

                // Display analysis
                displayAnalysis(analysis);

                message.className = 'message success';
                message.textContent = 'Deal analyzed successfully!';
                message.style.display = 'block';

            } catch (error) {
                console.error('Analysis error:', error);
                loading.style.display = 'none';
                message.className = 'message error';
                message.textContent = 'Error analyzing deal. Please try again.';
                message.style.display = 'block';
            }
        });

        function displayAnalysis(analysis) {
            const resultDiv = document.getElementById('analysisResult');
            let html = '<h3>Analysis Results</h3>';

            html += `
                <div class="analysis-section">
                    <h3>Deal Summary</h3>
                    <p>${analysis.deal_summary}</p>
                </div>

                <div class="analysis-section">
                    <h3>Stakeholders</h3>
                    <ul>
                        ${analysis.stakeholders.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>

                <div class="analysis-section">
                    <h3>Customer Intent</h3>
                    <p>${analysis.customer_intent}</p>
                </div>

                <div class="analysis-section">
                    <h3>Objections</h3>
                    ${analysis.objections.length > 0 ? `
                        <ul>
                            ${analysis.objections.map(o => `<li><strong>${o.type}:</strong> ${o.detail}</li>`).join('')}
                        </ul>
                    ` : '<p>No objections detected</p>'}
                </div>

                <div class="analysis-section">
                    <h3>Suggested Responses</h3>
                    <ul>
                        ${analysis.suggested_responses.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                </div>

                <div class="analysis-section">
                    <h3>Deal Health Score</h3>
                    <p><span class="score">${analysis.deal_health_score.score}%</span></p>
                    <p>${analysis.deal_health_score.reason}</p>
                </div>

                <div class="analysis-section">
                    <h3>Risks</h3>
                    ${analysis.risks.length > 0 ? `
                        <ul>
                            ${analysis.risks.map(r => `<li>${r}</li>`).join('')}
                        </ul>
                    ` : '<p>No significant risks identified</p>'}
                </div>

                <div class="analysis-section">
                    <h3>Next Best Actions</h3>
                    <ul>
                        ${analysis.next_actions.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                </div>

                <div class="analysis-section">
                    <h3>Competitor Insights</h3>
                    <p>${analysis.competitor_insights}</p>
                </div>
            `;

            resultDiv.innerHTML = html;
        }

        async function saveDeal(username, analysis) {
            try {
                await fetch(`/api/deals/${username}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(analysis)
                });
            } catch (error) {
                console.error('Error saving deal:', error);
            }
        }

        async function loadDealHistory(username) {
            try {
                const response = await fetch(`/api/deals/${username}`);
                const data = await response.json();
                const dealsList = document.getElementById('dealsList');

                if (data.deals.length > 0) {
                    dealsList.innerHTML = data.deals.map(deal => `
                        <div class="deal-item">
                            <h4>Deal Health Score: ${deal.deal_health_score?.score || 'N/A'}%</h4>
                            <p><strong>Customer Intent:</strong> ${deal.customer_intent || 'Not specified'}</p>
                            <p><strong>Saved:</strong> ${new Date(deal.timestamp).toLocaleString()}</p>
                        </div>
                    `).join('');
                } else {
                    dealsList.innerHTML = '<p>No deals saved yet.</p>';
                }
            } catch (error) {
                console.error('Error loading deal history:', error);
            }
        }

        function logout() {
            sessionStorage.removeItem('username');
            window.location.href = '/login.html';
        }
    </script>
</body>
</html>
