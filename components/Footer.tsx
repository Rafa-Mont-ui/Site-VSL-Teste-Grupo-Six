export default function Footer() {
  return (
    <footer className="border-t bg-muted/50 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              <span className="font-bold text-xl">VitaSlim</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transformando vidas através da ciência e nutrição natural desde 2020.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Links Importantes</h4>
            <nav className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Política de Reembolso
              </a>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📧 suporte@vitaslim.com.br</p>
              <p>📱 (11) 99999-9999</p>
              <p>🕒 Seg-Sex: 9h às 18h</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="text-xs text-muted-foreground space-y-4">
            <p className="font-semibold">DISCLAIMER IMPORTANTE:</p>
            <p>
              * Os resultados podem variar de pessoa para pessoa. Este produto não se destina a diagnosticar, tratar,
              curar ou prevenir qualquer doença. As informações contidas neste site são apenas para fins educacionais e
              não devem ser consideradas como aconselhamento médico. Sempre consulte seu médico antes de iniciar
              qualquer programa de perda de peso.
            </p>
            <p>
              * Os depoimentos apresentados são de pessoas reais, mas os resultados individuais podem variar. Não
              garantimos que você obterá os mesmos resultados.
            </p>
            <p className="text-center pt-4 border-t">
              © {new Date().getFullYear()} VitaSlim. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
