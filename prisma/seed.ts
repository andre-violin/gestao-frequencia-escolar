import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')
  console.log('')

  // ========================================
  // SEED DE ESTUDANTES
  // ========================================
  console.log('📚 Populando Estudantes...')

  const estudantes = [
    {
      name: 'João Silva',
      email: 'joao.silva@estudante.com',
      registration: '2024001',
      course: 'ADS',
      isActive: true,
    },
    {
      name: 'Maria Santos',
      email: 'maria.santos@estudante.com',
      registration: '2024002',
      course: 'ADS',
      isActive: true,
    },
    {
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@estudante.com',
      registration: '2024003',
      course: 'Informática',
      isActive: true,
    },
    {
      name: 'Ana Costa',
      email: 'ana.costa@estudante.com',
      registration: '2024004',
      course: 'Redes',
      isActive: false,
    },
  ]

  let criados = 0
  let jaExistentes = 0

  for (const dados of estudantes) {
    try {
      const existente = await prisma.student.findFirst({
        where: {
          OR: [{ email: dados.email }, { registration: dados.registration }],
        },
      })

      if (existente) {
        console.log(`⚠️  Já existe: ${dados.name} - ${dados.registration}`)
        jaExistentes++
      } else {
        await prisma.student.create({
          data: dados,
        })
        console.log(`✅ Criado: ${dados.name} - ${dados.registration}`)
        criados++
      }
    } catch (erro: any) {
      console.error(`❌ Erro ao processar ${dados.name}:`, erro.message)
    }
  }

  console.log('')
  console.log('📊 Estudantes:')
  console.log(`   ✅ Criados: ${criados}`)
  console.log(`   ⚠️  Já existiam: ${jaExistentes}`)
  console.log('')

  // ========================================
  // SEED DE PROFESSORES
  // ========================================
  console.log('👨‍🏫 Populando Professores...')

  const professores = [
    {
      name: 'Carlos Mendes',
      email: 'carlos.mendes@ifms.edu.br',
      subject: 'Programação Web',
      isActive: true,
    },
    {
      name: 'Fernanda Lima',
      email: 'fernanda.lima@ifms.edu.br',
      subject: 'Banco de Dados',
      isActive: true,
    },
    {
      name: 'Roberto Santos',
      email: 'roberto.santos@ifms.edu.br',
      subject: 'Redes de Computadores',
      isActive: true,
    },
    {
      name: 'Julia Oliveira',
      email: 'julia.oliveira@ifms.edu.br',
      subject: 'Engenharia de Software',
      isActive: true,
    },
    {
      name: 'Paulo Rodrigues',
      email: 'paulo.rodrigues@ifms.edu.br',
      subject: 'Matemática',
      isActive: false,
    },
  ]

  let professoresCriados = 0
  let professoresExistentes = 0

  for (const dados of professores) {
    try {
      const existente = await prisma.teacher.findFirst({
        where: { email: dados.email },
      })

      if (existente) {
        console.log(`⚠️  Já existe: ${dados.name} - ${dados.subject}`)
        professoresExistentes++
      } else {
        await prisma.teacher.create({
          data: dados,
        })
        console.log(`✅ Criado: ${dados.name} - ${dados.subject}`)
        professoresCriados++
      }
    } catch (erro: any) {
      console.error(`❌ Erro ao processar ${dados.name}:`, erro.message)
    }
  }

  console.log('')
  console.log('📊 Professores:')
  console.log(`   ✅ Criados: ${professoresCriados}`)
  console.log(`   ⚠️  Já existiam: ${professoresExistentes}`)
  console.log('')

  // ========================================
  // RESULTADO FINAL
  // ========================================
  console.log('========================================')
  console.log('📈 RESUMO GERAL:')
  console.log(`   Estudantes: ${criados} criados, ${jaExistentes} existentes`)
  console.log(`   Professores: ${professoresCriados} criados, ${professoresExistentes} existentes`)
  console.log('========================================')
  console.log('')
  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((erro) => {
    console.error('❌ Erro no seed:', erro)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
