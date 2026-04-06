<main class="forms">
    <h2> Criar Venda</h2>
    <article class="formulario">
    <form method="post">
        {% csrf_token %}

        <label>Produto:</label><br>
         <input list="produtos" name="produto_nome" placeholder="Digite o produto">

         <datalist id="produtos">
             {% for produto in produtos %}
        <option value="{{ produto.nome }}">
             {% endfor %}
         </datalist>

        <br><br>

        <label>Vendedor:</label><br>
        <select name="vendedor">
            {% for vendedor in vendedores %}
                <option value="{{ vendedor.id }}">
                    {{ vendedor.nome }}
                </option>
            {% endfor %}
        </select>

        <br><br>

        <label>Quantidade:</label><br>
        <input type="number" name="quantidade" required>

        <br><br>

        <button type="submit">Salvar Venda</button>
        </form>
    </article>    
    </main>