<template>
  <div class="page">
    <!-- Topbar -->
    <!-- Topbar -->
    <header class="topbar">
      <div class="brand">
        <img src="/images.png" width="55" />
        <div>
          <div class="brand-title">W|E Educación Ejecutiva</div>
          <div class="brand-sub">Ficha de certificación</div>
        </div>
      </div>

    </header>


    <!-- Progress + Stepper -->
    <section class="progress-wrap">
      <div class="progress">
        <div class="bar" :style="{ width: progressPct + '%' }"></div>
      </div>
<!-- 
      <div class="stepper">
        <button
          v-for="s in sections"
          :key="s.step"
          class="step"
          :class="stepClass(s.step)"
          @click="goTo(s.step)"
          :disabled="!sectionReachable(s.step)"
        >
          <span class="idx">{{ s.step }}</span><span>{{ s.section }}</span>
        </button>
      </div> -->
    </section>

    <!-- Main grid -->
    <div class="grid no-preview">
      <div class="card form-card">
        <transition name="fade-slide" mode="out-in">
          <div :key="currentStep">
            <!-- STEP 1: BIENVENIDA -->
            <section v-if="currentStep === 1" class="form-section">
              <!-- <h3>Bienvenida</h3> -->
              <p class="muted">
                <strong>Bienvenido(a) a W|E Educación Ejecutiva💙</strong>
                <br><br>
                En W|E Educación Ejecutiva encontrarás los programas más demandados en el mercado actual que son dictados por Gerente Ejecutivos a nivel LATAM. Como parte del proceso de certificación WE En Vivo es necesario que completes esta ficha con tus datos correctamente escritos.
                <br><br>
                📍W|E no se hace responsable en caso haya algún error en la información brindada.
              </p>
            </section>

            <!-- STEP 2: CONTACTO -->
            <section v-else-if="currentStep === 2" class="form-section">
              <h3>Datos de contacto</h3>
              <div class="row">
                <div class="field col-4">
                  <label>Correo <span class="req">*</span></label>
                  <input autocomplete="new-password"
                    v-model.trim="form.email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    @blur="touch('email')"
                    :class="vClass('email')"
                  />
                  <small v-if="touched.email && !form.email" class="err">Requerido</small>
                </div>

                <div class="field col-3">
                  <label>Nro. de Documento <span class="req">*</span></label>
                  <input autocomplete="new-password"
                    v-model.trim="form.documento"
                    placeholder="nro de documento"
                    @blur="touch('documento')"
                    v-restrict="{ only: 'numbers', max: 20 }"
                    :class="vClass('documento')"
                  />
                  <small v-if="touched.documento && !form.documento" class="err">Requerido</small>
                </div>

                <div class="field col-2">
                  <label>Fecha de Nacimiento <span class="req">*</span></label>
                  <input autocomplete="new-password" v-model="form.born" type="date"
                    @blur="touch('born')"
                    :class="vClass('born')"/>
                  <small v-if="touched.born && !form.born" class="err">Requerido</small>
                </div>

                <div class="field col-4">
                  <label>Apellidos <span class="req">*</span></label>
                  <input autocomplete="new-password"
                    v-model.trim="form.apellidos"
                    placeholder="Paterno y materno"
                    @blur="touch('apellidos')"
                    v-restrict="{ only: 'letters', max: 80, transform:'upper' }"
                    :class="vClass('apellidos')"
                  />
                  <small v-if="touched.apellidos && !form.apellidos" class="err">Requerido</small>
                </div>

                <div class="field col-4">
                  <label>Nombres <span class="req">*</span></label>
                  <input autocomplete="new-password"
                    v-model.trim="form.nombres"
                    placeholder="Tus nombres"
                    v-restrict="{ only: 'letters', max: 80, transform:'upper' }"
                    @blur="touch('nombres')"
                    :class="vClass('nombres')"
                  />
                  <small v-if="touched.nombres && !form.nombres" class="err">Requerido</small>
                </div>
              </div>
            </section>

            <!-- STEP 3: PROGRAMA -->
            <section v-else-if="currentStep === 3" class="form-section">
              <h3>Programa a Certificarse</h3>
              <div class="row">
                <div class="field col-6">
                  <label>Categoría <span class="req">*</span></label>
                  <SearchSelect
                    v-model="form.categoriaPrograma"
                    :items="catalogo.categories"
                    label-field="label"
                    value-field="value"
                    placeholder="Selecciona categoría…"
                    @update:modelValue="touch('categoriaPrograma')"
                    @change="onChangeCategory($event)"
                    :max-visible-items="5"
                    :item-height-px="34"
                  />
                  <small v-if="touched.categoriaPrograma && !form.categoriaPrograma" class="err">
                    Requerido
                  </small>
                </div>
                <div class="field col-6" v-if="form.categoriaPrograma">
                  <label>Programa <span class="req">*</span></label>
                  <SearchSelect
                    v-model="form.programa"
                    :items="programList"
                    label-field="label"
                    value-field="value"
                    placeholder="Selecciona el programa…"
                    @update:modelValue="touch('programa')"
                    :max-visible-items="5"
                    :item-height-px="34"
                  />
                  <small v-if="touched.programa && !form.programa" class="err">Requerido</small>
                </div>
              </div>
            </section>

            <!-- STEP 4: PERFIL -->
            <section v-else-if="currentStep === 4" class="form-section">
              <h3>Perfil académico y profesional</h3>


              <!-- B. Formación -->
              <div class="row">
                <div class="field col-6">
                  <label>Carrera <span class="req">*</span></label>
                    <small class="assist">En caso de no encontrar tu <b>carrera</b> o <b>estudio</b>, elige “Otra”.</small>

                  <SearchSelect
                    v-model="form.carrera"
                    :items="catalogo.carreras"
                    label-field="label"
                    value-field="value"
                    placeholder="Ej: Ingeniería Industrial"
                  />
                </div>
                <div v-if="form.carrera === 'otra'" class="field col-6">
                  <label>Especifica la carrera</label>
                  <input autocomplete="new-password" v-model.trim="form.carreraOtra" placeholder="Describe tu carrera" />
                </div>

                <div v-if="form.carrera !=   'otra'" class="col-6"></div>

                <div class="field col-6">
                  <label>Universidad <span class="req">*</span></label>
                    <small class="assist">En caso de no encontrar tu <b>Universidad</b> o <b>Instituto</b>, elige “Otra”.</small>
                  <SearchSelect
                    v-model="form.universidad"
                    :items="catalogo.universidades"
                    label-field="label"
                    value-field="value"
                    placeholder="Selecciona…"
                  />
                </div>
                <div v-if="form.universidad === 'otra'" class="field col-6">
                  <label>Especifica la universidad</label>
                  <input autocomplete="new-password" v-model.trim="form.universidadOtra" placeholder="Nombre de la universidad" />
                </div>

                <div v-if="form.universidad != 'otra'" class="col-6"></div>

                <div class="field col-6">
                  <label>Grado académico <span class="req">*</span></label>
                  <SearchSelect
                    v-model="form.gradoAcademico"
                    :items="catalogo.grados"
                    label-field="label"
                    value-field="value"
                    placeholder="Selecciona…"
                    :max-visible-items="5"
                    :item-height-px="34"
                  />
                </div>
              </div>

              <h3>Ubicación</h3>
              <div class="row">
                <div class="field col-4">
                  <label>País <span class="req">*</span></label>
                  <SearchSelect
                    v-model="form.pais"
                    :items="catalogo.paises"
                    label-field="label"
                    value-field="value"
                    placeholder="Selecciona…"
                  />
                </div>
                <div class="field col-4">
                  <label>Departamento / Región <span class="req">*</span></label>
                  <input v-restrict="{ only: 'letters', max: 80, transform:'upper' }"
                   autocomplete="new-password" v-model.trim="form.departamento" placeholder="Lima, Santiago, Buenos Aires etc." />
                </div>
              </div>
              
              <h3>Experiencia Laboral</h3>
              <!-- A. Situación primero -->
              <div class="row">
                <div class="field col-4"> 
                  <label>Situación actual <span class="req">*</span></label>
                  <SearchSelect
                    v-model="form.situacionActual"
                    :items="catalogo.situaciones"
                    label-field="label"
                    value-field="value"
                    placeholder="Estudiante / Trabaja"
                  />
                </div>
              </div>

              <!-- C. Experiencia laboral (solo si labura) -->
              <template v-if="isLaborando">
                <!--un tipo subtitulo con estilo que resalte-->
                <div class="form-section-subtitle">
                  <p class="muted">Cuéntanos sobre tu experiencia actual.</p>
                
                  <div class="row">
                    <div class="field col-6">
                      <label>Área actual <span class="req">*</span></label>
                      <SearchSelect
                        v-model="form.areaActual"
                        :items="catalogo.areasTrabajo"
                        label-field="label"
                        value-field="value"
                        placeholder="Selecciona…"
                      />
                    </div>
                    <div class="field col-6">
                      <label>Área deseada <span class="req">*</span></label>
                      <SearchSelect
                        v-model="form.areaDeseada"
                        :items="catalogo.areasTrabajo"
                        label-field="label"
                        value-field="value"
                        placeholder="Selecciona…"
                      />
                    </div>
                    <div class="field col-6"> 
                      <label>Nombre de la Empresa <span class="req">*</span></label>
                      <input autocomplete="new-password" v-model.trim="form.empresa" placeholder="Empresa S.A.C" v-restrict="{ only: 'letters', max: 80 }"/>
                    </div>
                    <div class="field col-6">
                      <label>Puesto <span class="req">*</span></label>
                      <input autocomplete="new-password" v-model.trim="form.puesto" placeholder="Cargo actual" v-restrict="{ only: 'letters', max: 80 }"/>
                    </div>
                    <div class="field col-4">
                      <label>Años de experiencia <span class="req">*</span></label>
                      <input autocomplete="new-password" v-model.number="form.aniosExp" type="number" min="0" placeholder="0" />
                    </div>
                    <div class="field col-4">
                      <label>Sector económico <span class="req">*</span></label>
                      <SearchSelect
                        v-model="form.sector"
                        :items="catalogo.sectores"
                        label-field="label"
                        value-field="value"
                        placeholder="Educación, TI, Banca…"
                      />
                    </div>
                </div>
                </div>
              </template>
            </section>

            <!-- STEP 5: ACCESIBILIDAD -->
            <section v-else-if="currentStep === 5" class="form-section">
              <h3>Accesibilidad</h3>
              <div class="row">
                <div class="field col-6">
                  <label>¿Cuentas con alguna necesidad especial que podamos tener en cuenta para mejorar tu experiencia de aprendizaje? <span class="req">*</span></label>
                  <SearchSelect
                    v-model="form.necesidadEspecial"
                    :items="catalogo.problems"
                    label-field="label"
                    value-field="value"
                    placeholder="Selecciona…"
                  />
                </div>
                <div v-if="form.necesidadEspecial === 'otro'" class="field col-6">
                  <label>Especifica <span class="req">*</span></label>
                  <input autocomplete="new-password" v-model.trim="form.necesidadEspecialOtra" placeholder="Describe aquí" />
                </div>
                
              </div>
            </section>

            <!-- STEP 6: IDENTIDAD -->
            <section v-else-if="currentStep === 6" class="form-section">
              <h3>Verificación de identidad</h3>
              <p class="muted">Adjunta ambas caras de tu DNI/ID</p>
              <div class="row">
                <div class="field col-6">
                  <label>Frontal <span class="req">*</span></label>
                  <input autocomplete="new-password"
                    ref="dniFront"
                    type="file"
                    accept="image/*"
                    @change="onFile($event, 'front')"
                    :class="{ invalid: touchedFiles.front && !files.front }"
                  />
                  <small v-if="touchedFiles.front && !files.front" class="err">Requerido</small>
                  <div v-if="previews.front" class="thumb">
                    <img :src="previews.front" alt="DNI frontal" />
                  </div>
                </div>

                <div class="field col-6">
                  <label>Reverso <span class="req">*</span></label>
                  <input autocomplete="new-password"
                    ref="dniBack"
                    type="file"
                    accept="image/*"
                    @change="onFile($event, 'back')"
                    :class="{ invalid: touchedFiles.back && !files.back }"
                  />
                  <small v-if="touchedFiles.back && !files.back" class="err">Requerido</small>
                  <div v-if="previews.back" class="thumb">
                    <img :src="previews.back" alt="DNI reverso" />
                  </div>
                </div>

              </div>
            </section>

            <!-- STEP 7: DESPEDIDA -->
            <section v-else-if="currentStep === 7" class="form-section ">
              <!-- <h3>Despedida</h3> -->
              <p class="muted fw-bold text-center">
                Muchas gracias por darte el tiempo de llegar hasta aquí 😊 Gracias a ti, seguiremos mejorando nuestra propuesta y ofrecerte lo mejor 🚀
                <br>
                <hr>
                <img src="/footer.png" width="70%" alt="">

              </p>
            </section>

            <!-- Step nav -->
            <div class="step-nav">
              <button v-if="currentStep != '1'" class="btn ghost" @click="prev" :disabled="currentStep === minStep || currentStep=='2'">Atrás</button>
              <!-- Mostrar “Siguiente” solo si NO es el último paso -->
              <button
                v-if="currentStep < maxStep"
                class="btn"
                @click="next"
                :disabled="!canNext"
              >
                {{(currentStep == '1')?'Empezar':'Siguiente'}}
              </button>
              <button
                v-if="currentStep === maxStep"
                class="btn primary"
                :disabled="isSubmitting"
                @click="submit"
              >
                {{ isSubmitting ? 'Enviando…' : 'Enviar' }}
              </button>

            </div>

          </div>
        </transition>
      </div>
    </div>

    <!-- Toast -->
    <transition name="toast">
      <div v-if="toast" class="toast">{{ toast }}</div>
    </transition>
    <!-- Success Modal -->
    <transition name="fade-slide">
      <div v-if="showSuccess" class="modal-backdrop" @click.self="onSuccessOK">
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="ok-title">
          <div class="modal-icon">✅</div>
          <h3 id="ok-title" class="modal-title">¡Información enviada!</h3>
          <p class="modal-text">Tu ficha fue registrada correctamente.</p>
          <button class="btn" @click="onSuccessOK" autofocus>Aceptar</button>
        </div>
      </div>
    </transition>

  </div>
  
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted, inject } from 'vue'
import SearchSelect from '@/components/SearchSelect.vue'
import { ServiceKeys } from '@/services'
const dniFront = ref(null)
const dniBack  = ref(null)

const programService   = inject(ServiceKeys.Program)
const comercialService = inject(ServiceKeys.Comercial)
const catalog          = inject('catalog')
const showSuccess = ref(false)

function onSuccessOK() {
  showSuccess.value = false
  resetForm()               // aquí recién limpiamos todo
}

/* --------------------
 * Secciones (con %)
 * -------------------- */
const sections = [
  { section: 'Bienvenida',    porcent: 0,   step: 1 }, // texto
  { section: 'Contacto',      porcent: 0,  step: 2 },
  { section: 'Programa',      porcent: 20,  step: 3 },
  { section: 'Perfil',        porcent: 40,  step: 4 },
  { section: 'Accesibilidad', porcent: 60,  step: 5 },
  { section: 'Identidad',     porcent: 80,  step: 6 },
  { section: 'Despedida',     porcent: 100, step: 7 }  // texto
]
const minStep = 1
const maxStep = 7
function next(){
  if(!canNext.value){
    showToast('Completa los campos requeridos del paso actual')
    return
  }
  currentStep.value++
}

/* --------------------
 * Estado base
 * -------------------- */
const form = reactive({
  email: '',
  documento: '',
  born: '',
  apellidos: '',
  nombres: '',
  celular: '',
  categoriaPrograma: null,
  programa: null,
  carrera: null,
  carreraOtra: '',
  universidad: null,
  universidadOtra: '',
  gradoAcademico: null,
  situacionActual: null,
  areaActual: null,
  areaDeseada: null,
  empresa: '',
  puesto: '',
  aniosExp: null,
  sector: null,
  programaEmprendimiento: '',
  tallerSpeaking: '',
  pais: null,
  departamento: '',
  necesidadEspecial: null,
  necesidadEspecialOtra: '',
})

const defaultForm = {
  email: '', documento: '', born: '', apellidos: '', nombres: '', celular: '',
  categoriaPrograma: null, programa: null,
  carrera: null, carreraOtra: '',
  universidad: null, universidadOtra: '',
  gradoAcademico: null, situacionActual: null,
  areaActual: null, areaDeseada: null,
  empresa: '', puesto: '', aniosExp: null, sector: null,
  programaEmprendimiento: '', tallerSpeaking: '',
  pais: null, departamento: '',
  necesidadEspecial: null, necesidadEspecialOtra: ''
}
Object.assign(form, defaultForm)

const isSubmitting = ref(false)


const files = reactive({ front: null, back: null })
const touchedFiles = reactive({ front: false, back: false })

const previews = reactive({ front: '', back: '' })
const touched = reactive({})
const toast = ref('')
const currentStep = ref(1)
const autosaveState = ref('inactivo')

/* --------------------
 * Catálogos (mock + los tuyos)
 * -------------------- */
const catalogo = {
  carreras: [
    { value: 'industrial', label: 'Ingeniería Industrial' },
    { value: 'sistemas', label: 'Ingeniería de Sistemas' }, { value: 'sistemas', label: 'Ingeniería de Software' }, { value: 'adm', label: 'Administración' }, { value: 'derecho', label: 'Derecho' }, { value: 'marketing', label: 'Marketing' }, { value: 'contabilidad', label: 'Contabilidad' }, { value: 'medicina', label: 'Medicina Humana' }, { value: 'arquitectura', label: 'Arquitectura' }, { value: 'comunicaciones', label: 'Ciencias de la Comunicación' }, { value: 'psicologia', label: 'Psicología' }, { value: 'educacion', label: 'Educación' }, { value: 'derecho', label: 'Derecho' }, { value: 'economia', label: 'Economía' }, { value: 'marketing', label: 'Marketing' }, { value: 'diseno', label: 'Diseño Gráfico' }, { value: 'gastronomia', label: 'Gastronomía' }, { value: 'turismo', label: 'Turismo y Hotelería' }, { value: 'mecanica', label: 'Ingeniería Mecánica' }, { value: 'civil', label: 'Ingeniería Civil' }, { value: 'quimica', label: 'Ingeniería Química' }, { value: 'ambiental', label: 'Ingeniería Ambiental' }, { value: 'minas', label: 'Ingeniería de Minas' }, { value: 'petroleo', label: 'Ingeniería de Petróleo' }, { value: 'agroindustrial', label: 'Ingeniería Agroindustrial' }, { value: 'zootecnia', label: 'Zootecnia' }, { value: 'veterinaria', label: 'Medicina Veterinaria' }, { value: 'enfermeria', label: 'Enfermería' }, { value: 'obstetricia', label: 'Obstetricia' }, { value: 'farmacia', label: 'Farmacia y Bioquímica' }, { value: 'nutricion', label: 'Nutrición' }, { value: 'odontologia', label: 'Odontología' }, { value: 'teatro', label: 'Arte Dramático' }, { value: 'musica', label: 'Música' }, { value: 'danza', label: 'Danza' }, { value: 'periodismo', label: 'Periodismo' }, { value: 'publicidad', label: 'Publicidad' }, { value: 'relaciones_publicas', label: 'Relaciones Públicas' }, { value: 'sociologia', label: 'Sociología' }, { value: 'antropologia', label: 'Antropología' }, { value: 'arqueologia', label: 'Arqueología' }, { value: 'historia', label: 'Historia' }, { value: 'filosofia', label: 'Filosofía' }, { value: 'literatura', label: 'Literatura' }, { value: 'linguistica', label: 'Lingüística' }, { value: 'matematicas', label: 'Matemáticas' }, { value: 'fisica', label: 'Física' }, { value: 'quimica_pura', label: 'Química Pura' }, { value: 'biologia', label: 'Biología' }, { value: 'genetica', label: 'Genética' }, { value: 'robotica', label: 'Robótica' }, { value: 'telecomunicaciones', label: 'Ingeniería de Telecomunicaciones' }, { value: 'energia', label: 'Ingeniería de la Energía' }, { value: 'textil', label: 'Ingeniería Textil' }, { value: 'pesquera', label: 'Ingeniería Pesquera' }, { value: 'forestal', label: 'Ingeniería Forestal' }, { value: 'geologica', label: 'Ingeniería Geológica' }, { value: 'metalurgica', label: 'Ingeniería Metalúrgica' }, { value: 'estadistica', label: 'Estadística' }, { value: 'actuaria', label: 'Ciencias Actuariales y Financieras' }, { value: 'hoteleria', label: 'Administración Hotelera' }, { value: 'turismo_sostenible', label: 'Turismo Sostenible' }, { value: 'negocios_internacionales', label: 'Negocios Internacionales'}, { value: 'gestion_publica', label: 'Gestión Pública' }, { value: 'ciencias_politicas', label: 'Ciencias Políticas' }, { value: 'relaciones_internacionales', label: 'Relaciones Internacionales' }, { value: 'oceanografia', label: 'Oceanografía' }, { value: 'meteorologia', label: 'Meteorología' }, { value: 'geografia', label: 'Geografía' }, { value: 'urbanismo', label: 'Urbanismo' }, { value: 'bibliotecologia', label: 'Bibliotecología y Ciencias de la Información' }, { value: 'conservacion', label: 'Conservación y Restauración' }, { value: 'traduccion', label: 'Traducción e Interpretación' }, { value: 'criminalistica', label: 'Criminalística' }, { value: 'seguridad', label: 'Seguridad y Defensa' }, { value: 'deporte', label: 'Ciencias del Deporte' }, { value: 'danza_arte', label: 'Danza y Arte Dramático' }, { value: 'fotografia', label: 'Fotografía' }, { value: 'joyeria', label: 'Joyería' }, { value: 'diseno_interiores', label: 'Diseño de Interiores' }, { value: 'diseno_modas', label: 'Diseño de Modas' }, { value: 'robotica_ia', label: 'Robótica e Inteligencia Artificial' }, { value: 'ciencia_datos', label: 'Ciencia de Datos' }, { value: 'ciberseguridad', label: 'Ciberseguridad' }, { value: 'blockchain', label: 'Tecnologías Blockchain' }, { value: 'energias_renovables', label: 'Ingeniería en Energías Renovables' }, { value: 'biotecnologia', label: 'Biotecnología' }, { value: 'neurociencia', label: 'Neurociencia' },
    { value: 'otra',       label: 'Otra' }
  ],
  universidades: [
    { value: 'utp', label: 'UTP' }, 
    { value: 'uni', label: 'UNI' }, { value: 'pucp', label: 'PUCP' }, { value: 'unmsm', label: 'UNMSM' }, { value: 'upc', label: 'UPC' }, { value: 'esan', label: 'ESAN' }, { value: 'lima', label: 'Universidad de Lima' }, { value: 'pacifico', label: 'Universidad del Pacífico' }, { value: 'cientifica', label: 'Universidad Científica del Sur' }, { value: 'usil', label: 'USIL' }, { value: 'continental', label: 'Continental' }, { value: 'utec', label: 'UTEC' }, { value: 'wiener', label: 'Wiener' }, { value: 'ricardo_palma', label: 'Ricardo Palma' }, { value: 'san_martin', label: 'San Martín de Porres' }, { value: 'catolica_santa', label: 'Universidad Católica Sedes Sapientiae' }, { value: 'antonio_ruiz', label: 'Antonio Ruiz de Montoya' }, { value: 'peruana_union', label: 'Unión Peruana' }, { value: 'nacional_ingenieria', label: 'Universidad Nacional de Ingeniería' }, { value: 'nacional_mayor', label: 'Universidad Nacional Mayor de San Marcos' }, { value: 'agraria_lamolina', label: 'Universidad Nacional Agraria La Molina' }, { value: 'federico_villarreal', label: 'Universidad Nacional Federico Villarreal' }, { value: 'callao', label: 'Universidad Nacional del Callao' }, { value: 'amazonica', label: 'Universidad Nacional de la Amazonía Peruana' }, { value: 'piura', label: 'Universidad de Piura' }, { value: 'trujillo', label: 'Universidad Nacional de Trujillo' }, { value: 'chiclayo', label: 'Universidad Nacional Pedro Ruiz Gallo' }, { value: 'cajamarca', label: 'Universidad Nacional de Cajamarca' }, { value: 'huanuco', label: 'Universidad Nacional Hermilio Valdizán' }, { value: 'ica', label: 'Universidad Nacional San Luis Gonzaga' }, { value: 'tacna', label: 'Universidad Nacional Jose Mariátegui' }, { value: 'arequipa_catolica', label: 'Universidad Católica de Santa María' }, { value: 'arequipa_nacional', label: 'Universidad Nacional de San Agustín' }, { value: 'cusco_nacional', label: 'Universidad Nacional de San Antonio Abad del Cusco' }, { value: 'huancayo', label: 'Universidad Nacional del Centro del Perú' }, { value: 'iquitos', label: 'Universidad Nacional de la Amazonía Peruana' }, { value: 'ayacucho', label: 'Universidad Nacional San Cristóbal de Huamanga' }, { value: 'puno', label: 'Universidad Nacional del Altiplano' }, { value: 'tarapoto', label: 'Universidad Nacional de San Martín' }, { value: 'chimbote', label: 'Universidad Nacional del Santa' }, { value: 'cerro_pasco', label: 'Universidad Nacional Daniel Alcides Carrión' }, { value: 'tingo_maria', label: 'Universidad Nacional Agraria de la Selva' }, { value: 'madre_de_dios', label: 'Universidad Nacional Amazónica de Madre de Dios' }, { value: 'tumbes', label: 'Universidad Nacional de Tumbes' }, { value: 'abancay', label: 'Universidad Nacional Micaela Bastidas de Apurímac' }, { value: 'moquegua', label: 'Universidad Nacional de Moquegua' }, { value: 'jaen', label: 'Universidad Nacional de Jaén' }, { value: 'cutervo', label: 'Universidad Nacional Autónoma de Chota' }, { value: 'barranca', label: 'Universidad Nacional de Barranca' }, { value: 'cañete', label: 'Universidad Nacional de Cañete' }, { value: 'hualgayoc', label: 'Universidad Nacional de Hualgayoc' }, { value: 'la_union', label: 'Universidad Nacional de La Unión' }, { value: 'gran_chimu', label: 'Universidad Nacional del Gran Chimú' },
    { value: 'otra', label: 'Otra' }
  ],
  situaciones: [
    { value: 'actualmente, no me encuentro laborando',  label: 'Actualmente no me encuentro laborando' },
    { value: 'me encuentro laborando',      label: 'Me encuentro laborando' },
    { value: 'nunca he laborado',  label: 'Nunca he laborado' }
  ],
  sectores: [
    { value: 'educacion', label: 'Educación' },
    { value: 'finanzas', label: 'Finanzas' },
    { value: 'salud', label: 'Salud' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufactura', label: 'Manufactura' },
    { value: 'tecnologia', label: 'Tecnología' },
    { value: 'consultoria', label: 'Consultoría' },
    { value: 'gobierno', label: 'Gobierno' },
    { value: 'energia', label: 'Energía' },
    { value: 'construccion', label: 'Construcción' },
    { value: 'medios', label: 'Medios y Comunicación' },
    { value: 'turismo', label: 'Turismo' },
    { value: 'automotriz', label: 'Automotriz' },
    { value: 'inmobiliaria', label: 'Inmobiliaria' },
    { value: 'servicios', label: 'Servicios' },
    { value: 'agroindustria', label: 'Agroindustria' },
    { value: 'mineria', label: 'Minería' },
    { value: 'telecomunicaciones', label: 'Telecomunicaciones' },
    { value: 'transporte', label: 'Transporte y Logística' },
    { value: 'moda', label: 'Moda' },
    { value: 'gastronomia', label: 'Gastronomía' },
    { value: 'entretenimiento', label: 'Entretenimiento' },
    { value: 'farmaceutica', label: 'Farmacéutica' },
    { value: 'seguros', label: 'Seguros' },
    { value: 'publicidad', label: 'Publicidad y Marketing' },
    { value: 'legal', label: 'Legal' },
    { value: 'investigacion', label: 'Investigación y Desarrollo' },
    { value: 'organizaciones_sin_fines_lucro', label: 'Organizaciones sin fines de lucro' }
  ],
  areasTrabajo: [
    { value: 'comercial', label: 'Comercial' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finanzas', label: 'Finanzas' },
    { value: 'operaciones', label: 'Operaciones' },
    { value: 'recursos_humanos', label: 'Recursos Humanos' },
    { value: 'tecnologia', label: 'Tecnología' },
    { value: 'legal', label: 'Legal' },
    { value: 'administracion', label: 'Administración' },
    { value: 'proyectos', label: 'Gestión de Proyectos' },
    { value: 'calidad', label: 'Calidad' },
    { value: 'investigacion_desarrollo', label: 'Investigación y Desarrollo' },
    { value: 'logistica', label: 'Logística' },
    { value: 'produccion', label: 'Producción' },
    { value: 'consultoria', label: 'Consultoría' },
    { value: 'atencion_cliente', label: 'Atención al Cliente' },
    { value: 'diseno', label: 'Diseño' },
    { value: 'educacion', label: 'Educación' },
    { value: 'salud', label: 'Salud' },
    { value: 'ventas', label: 'Ventas' },
    { value: 'ingenieria', label: 'Ingeniería' },
    { value: 'arte_diseno', label: 'Arte y Diseño' },
    { value: 'ciencias', label: 'Ciencias' },
    { value: 'salud', label: 'Salud' },
    { value: 'servicios_publicos', label: 'Servicios Públicos' },
    { value: 'medios_comunicacion', label: 'Medios de Comunicación' },
    { value: 'consultoria_estrategica', label: 'Consultoría Estratégica' },
    { value: 'investigacion_desarrollo', label: 'Investigación y Desarrollo' },
    { value: 'logistica_cadena_suministro', label: 'Logística y Cadena de Suministro' },
    { value: 'produccion_manufactura', label: 'Producción y Manufactura' },
    { value: 'energia_recursos_naturales', label: 'Energía y Recursos Naturales' },
    { value: 'construccion_infraestructura', label: 'Construcción e Infraestructura' },
    { value: 'turismo_hoteleria', label: 'Turismo y Hotelería' },
    { value: 'agroindustria', label: 'Agroindustria' },
    { value: 'mineria_metalurgia', label: 'Minería y Metalurgia' },
    { value: 'biotecnologia', label: 'Biotecnología' },
    { value: 'medio_ambiente', label: 'Medio Ambiente' },
    { value: 'seguridad_defensa', label: 'Seguridad y Defensa' },
    { value: 'deportes_recreacion', label: 'Deportes y Recreación' },
    { value: 'moda_belleza', label: 'Moda y Belleza' },
    { value: 'entretenimiento_ocio', label: 'Entretenimiento y Ocio' },
    { value: 'legal_judicial', label: 'Legal y Judicial' },
    { value: 'comercio_exterior', label: 'Comercio Exterior' },
    { value: 'banca_seguros', label: 'Banca y Seguros' }
  ],
  grados: [
    { value: 'tecnico', label: 'Técnico' },
    { value: 'bachiller', label: 'Bachiller' },
    { value: 'titulo', label: 'Título' },
    { value: 'maestria', label: 'Maestría' },
    { value: 'cursando', label: 'Cursando' },
    { value: 'secundaria', label: 'Secundaria Completa' },
    { value: 'primaria', label: 'Primaria Completa' },
  ],
  paises: [
    { value: 'pe', label: 'Perú' },
    { value: 'mx', label: 'México' }, { value: 'co', label: 'Colombia' }, { value: 'cl', label: 'Chile' }, { value: 'ar', label: 'Argentina' }, { value: 'br', label: 'Brasil' }, { value: 'ec', label: 'Ecuador' }, { value: 'bo', label: 'Bolivia' }, { value: 'uy', label: 'Uruguay' }, { value: 'py', label: 'Paraguay' }, { value: 've', label: 'Venezuela' }, { value: 'pa', label: 'Panamá' }, { value: 'cr', label: 'Costa Rica' }, { value: 'gt', label: 'Guatemala' }, { value: 'sv', label: 'El Salvador' }, { value: 'hn', label: 'Honduras' }, { value: 'ni', label: 'Nicaragua' }, { value: 'do', label: 'República Dominicana' }, { value: 'cu', label: 'Cuba' }, { value: 'pr', label: 'Puerto Rico' }, { value: 'es', label: 'España' }, { value: 'us', label: 'Estados Unidos' }, { value: 'ca', label: 'Canadá' }, { value: 'fr', label: 'Francia' }, { value: 'de', label: 'Alemania' }, { value: 'it', label: 'Italia' }, { value: 'pt', label: 'Portugal' }, { value: 'uk', label: 'Reino Unido' }, { value: 'au', label: 'Australia' }, { value: 'nz', label: 'Nueva Zelanda' }, { value: 'jp', label: 'Japón' }, { value: 'cn', label: 'China' }, { value: 'in', label: 'India' }, { value: 'za', label: 'Sudáfrica' }, { value: 'ru', label: 'Rusia' }, { value: 'se', label: 'Suecia' }, { value: 'no', label: 'Noruega' }, { value: 'dk', label: 'Dinamarca' }, { value: 'be', label: 'Bélgica' }, { value: 'ch', label: 'Suiza' }, { value: 'at', label: 'Austria' }, { value: 'ie', label: 'Irlanda' }, { value: 'nz', label: 'Nueva Zelanda' }, { value: 'sg', label: 'Singapur' }, { value: 'ae', label: 'Emiratos Árabes Unidos' }, { value: 'qa', label: 'Qatar' }, { value: 'sa', label: 'Arabia Saudita' }, { value: 'kr', label: 'Corea del Sur' }, { value: 'th', label: 'Tailandia' }, { value: 'my', label: 'Malasia' }, { value: 'id', label: 'Indonesia' }, { value: 'ph', label: 'Filipinas' }, { value: 'vn', label: 'Vietnam' }, { value: 'eg', label: 'Egipto' }, { value: 'ma', label: 'Marruecos' }, { value: 'ng', label: 'Nigeria' }, { value: 'ke', label: 'Kenia' }, { value: 'gh', label: 'Ghana' }, { value: 'et', label: 'Etiopía' }, { value: 'tz', label: 'Tanzania' }, { value: 'ug', label: 'Uganda' }, { value: 'dz', label: 'Argelia' }, { value: 'tn', label: 'Túnez' }, { value: 'ly', label: 'Libia' }, { value: 'sd', label: 'Sudán' }, { value: 'cd', label: 'República Democrática del Congo' }, { value: 'ao', label: 'Angola' }, { value: 'mz', label: 'Mozambique' }, { value: 'zm', label: 'Zambia' }, { value: 'zw', label: 'Zimbabue' }
  ],
  categories: [
    { value: 'diplomado', label: 'Diplomado' },
    { value: 'curso', label: 'Curso' },
    { value: 'especializacion', label: 'Especialización' },
    { value: 'pee', label: 'PEE' }
  ],
  problems: [
    { value: 'neuronal', label: 'Sí, necesito adaptaciones por razones de neurodiversidad (p. ej., TDAH, dislexia, autismo, etc.).' },
    { value: 'auditiva', label: 'Sí, necesito apoyo relacionado con discapacidad auditiva.' },
    { value: 'visual', label: 'Sí, necesito apoyo relacionado con discapacidad visual.' },
    { value: 'ninguna', label: 'No, no tengo ninguna necesidad específica.' },
    { value: 'otro', label: 'Otro' }
  ],
  programs: [
    // SAP Courses
    { value: 'SAP S/4 HANA MM: LOGÍSTICA Y MATERIALES', label: 'SAP S/4 HANA MM: LOGÍSTICA Y MATERIALES', category: 'curso' },
    { value: 'SAP S/4 HANA IN: SAP INTEGRAL (MM+PP+SD+FI)', label: 'SAP S/4 HANA IN: SAP INTEGRAL (MM+PP+SD+FI)', category: 'curso' },
    { value: 'SAP S/4 HANA EWM: LOGÍSTICA Y ALMACENES', label: 'SAP S/4 HANA EWM: LOGÍSTICA Y ALMACENES', category: 'curso' },
    { value: 'SAP S/4 HANA PP: PRODUCCIÓN', label: 'SAP S/4 HANA PP: PRODUCCIÓN', category: 'curso' },
    { value: 'SAP S/4 HANA SD: LOGÍSTICA Y DISTRIBUCIÓN', label: 'SAP S/4 HANA SD: LOGÍSTICA Y DISTRIBUCIÓN', category: 'curso' },
    { value: 'SAP S/4 HANA FI: CONTABILIDAD FINANCIERA', label: 'SAP S/4 HANA FI: CONTABILIDAD FINANCIERA', category: 'curso' },
    { value: 'SAP S/4 HANA HCM: GESTIÓN DEL CAPITAL HUMANO', label: 'SAP S/4 HANA HCM: GESTIÓN DEL CAPITAL HUMANO', category: 'curso' },
    { value: 'SAP S/4 HANA PM: MANTENIMIENTO DE PLANTA', label: 'SAP S/4 HANA PM: MANTENIMIENTO DE PLANTA', category: 'curso' },
    { value: 'SAP HANA QM', label: 'SAP HANA QM', category: 'curso' },
    { value: 'SAP HANA PS', label: 'SAP HANA PS', category: 'curso' },
    { value: 'SAP BUSINESS ONE', label: 'SAP BUSINESS ONE', category: 'curso' },
    
    // SAP Specializations
    { value: 'ESPECIALIZACIÓN EN SAP S/4 HANA: LOGÍSTICA INTEGRAL', label: 'ESPECIALIZACIÓN EN SAP S/4 HANA: LOGÍSTICA INTEGRAL', category: 'especializacion' },
    { value: 'ESPECIALIZACIÓN EN SAP S/4 HANA: COMPRAS Y ALMACENES', label: 'ESPECIALIZACIÓN EN SAP S/4 HANA: COMPRAS Y ALMACENES', category: 'especializacion' },
    { value: 'ESPECIALIZACIÓN EN SAP S/4 HANA: PLANIFICACIÓN DE LA PRODUCCIÓN', label: 'ESPECIALIZACIÓN EN SAP S/4 HANA: PLANIFICACIÓN DE LA PRODUCCIÓN', category: 'especializacion' },
    { value: 'ESPECIALIZACIÓN EN SAP S/4 HANA: GESTIÓN FINANCIERA', label: 'ESPECIALIZACIÓN EN SAP S/4 HANA: GESTIÓN FINANCIERA', category: 'especializacion' },
    { value: 'ESPECIALIZACIÓN EN SAP S/4 HANA', label: 'ESPECIALIZACIÓN EN SAP S/4 HANA', category: 'especializacion' },
    { value: 'ESPECIALIZACIÓN EN SAP S/4 HANA: MINERÍA', label: 'ESPECIALIZACIÓN EN SAP S/4 HANA: MINERÍA', category: 'especializacion' },
    
    // Excel Courses
    { value: 'MICROSOFT EXCEL BÁSICO', label: 'MICROSOFT EXCEL BÁSICO', category: 'curso' },
    { value: 'MICROSOFT EXCEL INTERMEDIO', label: 'MICROSOFT EXCEL INTERMEDIO', category: 'curso' },
    { value: 'MICROSOFT EXCEL AVANZADO', label: 'MICROSOFT EXCEL AVANZADO', category: 'curso' },
    { value: 'PROGRAMACIÓN CON VBA MACROS EN EXCEL', label: 'PROGRAMACIÓN CON VBA MACROS EN EXCEL', category: 'curso' },
    
    // Excel Specializations
    { value: 'ESPECIALIZACIÓN EN MICROSOFT EXCEL', label: 'ESPECIALIZACIÓN EN MICROSOFT EXCEL', category: 'especializacion' },
    { value: 'ESPECIALIZACIÓN EN VBA MACROS EN MICROSOFT EXCEL', label: 'ESPECIALIZACIÓN EN VBA MACROS EN MICROSOFT EXCEL', category: 'especializacion' },
    { value: 'ESPECIALIZACIÓN EN EXCEL EXPERT', label: 'ESPECIALIZACIÓN EN EXCEL EXPERT', category: 'especializacion' },
    
    // Data & Analytics Courses
    { value: 'SQL SERVER FOR ANALYTICS', label: 'SQL SERVER FOR ANALYTICS', category: 'curso' },
    { value: 'SQL SERVER AVANZADO', label: 'SQL SERVER AVANZADO', category: 'curso' },
    { value: 'POWER BI', label: 'POWER BI', category: 'curso' },
    { value: 'POWER BI AVANZADO - DAX', label: 'POWER BI AVANZADO - DAX', category: 'curso' },
    { value: 'PROGRAMACIÓN CON PYTHON', label: 'PROGRAMACIÓN CON PYTHON', category: 'curso' },
    { value: 'DATA ANALYTICS', label: 'DATA ANALYTICS', category: 'curso' },
    { value: 'DATA SCIENCE: MACHINE LEARNING', label: 'DATA SCIENCE: MACHINE LEARNING', category: 'curso' },
    { value: 'BUSINESS ANALYTICS', label: 'BUSINESS ANALYTICS', category: 'curso' },
    { value: 'IA & DEEP LEARNING', label: 'IA & DEEP LEARNING', category: 'curso' },
    { value: 'PYTHON: ANÁLISIS DE DATOS', label: 'PYTHON: ANÁLISIS DE DATOS', category: 'curso' },
    { value: 'PYTHON AVANZADO: MACHINE LEARNING', label: 'PYTHON AVANZADO: MACHINE LEARNING', category: 'curso' },
    { value: 'HERRAMIENTAS IA & PROMPTS', label: 'HERRAMIENTAS IA & PROMPTS', category: 'curso' },
    { value: 'AZURE', label: 'AZURE', category: 'curso' },
    { value: 'BIG DATA', label: 'BIG DATA', category: 'curso' },
    { value: 'DATABRICKS', label: 'DATABRICKS', category: 'curso' },
    { value: 'INGENIERO DE ANÁLISIS DE MICROSOFT FABRIC', label: 'INGENIERO DE ANÁLISIS DE MICROSOFT FABRIC', category: 'curso' },
    { value: 'DATA STORYTELLING', label: 'DATA STORYTELLING', category: 'curso' },
    
    // Data Diplomados
    { value: 'DIPLOMADO EN INTELIGENCIA Y ANÁLISIS DE DATOS', label: 'DIPLOMADO EN INTELIGENCIA Y ANÁLISIS DE DATOS', category: 'diplomado' },
    
    // Data Specializations
    { value: 'ESPECIALIZACIÓN EN POWER BI', label: 'ESPECIALIZACIÓN EN POWER BI', category: 'especializacion' },
    { value: 'ESPECIALIZACIÓN EN SQL SERVER', label: 'ESPECIALIZACIÓN EN SQL SERVER', category: 'especializacion' },
    { value: 'ESPECIALIZACIÓN EN DATA SCIENCE & IA', label: 'ESPECIALIZACIÓN EN DATA SCIENCE & IA', category: 'especializacion' },
    { value: 'ESPECIALIZACIÓN EN PYTHON: DATA SCIENCE', label: 'ESPECIALIZACIÓN EN PYTHON: DATA SCIENCE', category: 'especializacion' },
    
    // Data PEE
    { value: 'ANALISTA DE DATOS', label: 'ANALISTA DE DATOS', category: 'pee' },
    
    // Supply Chain Courses
    { value: 'PLANEAMIENTO Y PRONÓSTICO DE LA DEMANDA', label: 'PLANEAMIENTO Y PRONÓSTICO DE LA DEMANDA', category: 'curso' },
    { value: 'GERENCIA DE COMPRAS Y GESTIÓN DE PROVEEDORES', label: 'GERENCIA DE COMPRAS Y GESTIÓN DE PROVEEDORES', category: 'curso' },
    { value: 'GERENCIA DE CENTROS DE DISTRIBUCIÓN Y ALMACENES', label: 'GERENCIA DE CENTROS DE DISTRIBUCIÓN Y ALMACENES', category: 'curso' },
    { value: 'GESTIÓN DE TRANSPORTES Y CANALES DE DISTRIBUCIÓN', label: 'GESTIÓN DE TRANSPORTES Y CANALES DE DISTRIBUCIÓN', category: 'curso' },
    { value: 'LEAN LOGISTICS', label: 'LEAN LOGISTICS', category: 'curso' },
    { value: 'KPIS LOGÍSTICOS CON POWER BI', label: 'KPIS LOGÍSTICOS CON POWER BI', category: 'curso' },
    { value: 'SUPPLY CHAIN ANALYTICS CON PYTHON', label: 'SUPPLY CHAIN ANALYTICS CON PYTHON', category: 'curso' },
    { value: 'GESTIÓN DE COMPRAS Y PROVEEDORES', label: 'GESTIÓN DE COMPRAS Y PROVEEDORES', category: 'curso' },
    { value: 'SUPPLY CHAIN ANALYTICS', label: 'SUPPLY CHAIN ANALYTICS', category: 'curso' },
    
    // Supply Chain Diplomados
    { value: 'DIPLOMADO SUPPLY CHAIN MANAGEMENT', label: 'DIPLOMADO SUPPLY CHAIN MANAGEMENT', category: 'diplomado' },
    { value: 'DIPLOMADO DE SUPPLY CHAIN MANAGEMENT', label: 'DIPLOMADO DE SUPPLY CHAIN MANAGEMENT', category: 'diplomado' },
    
    // Supply Chain Specializations & PEE
    { value: 'ESPECIALISTA EN COMPRAS CON SAP', label: 'ESPECIALISTA EN COMPRAS CON SAP', category: 'especializacion' },
    { value: 'ANALISTA DE COMPRAS CON SAP', label: 'ANALISTA DE COMPRAS CON SAP', category: 'pee' },
    { value: 'DEMAND PLANNER', label: 'DEMAND PLANNER', category: 'pee' },
    { value: 'PLANEAMIENTO DE LA DEMANDA', label: 'PLANEAMIENTO DE LA DEMANDA', category: 'pee' },
    
    // Process Management Courses
    { value: 'GESTIÓN DE PROCESOS', label: 'GESTIÓN DE PROCESOS', category: 'curso' },
    { value: 'BIZAGI: MODELAMIENTO DE PROCESOS', label: 'BIZAGI: MODELAMIENTO DE PROCESOS', category: 'curso' },
    { value: 'LEAN SIX SIGMA', label: 'LEAN SIX SIGMA', category: 'curso' },
    { value: 'GESTIÓN DE INDICADORES KPIS Y OKRS', label: 'GESTIÓN DE INDICADORES KPIS Y OKRS', category: 'curso' },
    { value: 'ROBOTIZACIÓN DE PROCESOS CON UIPATH', label: 'ROBOTIZACIÓN DE PROCESOS CON UIPATH', category: 'curso' },
    { value: 'SISTEMAS INTEGRADOS DE GESTIÓN', label: 'SISTEMAS INTEGRADOS DE GESTIÓN', category: 'curso' },
    { value: 'POWER APPS Y POWER AUTOMATE', label: 'POWER APPS Y POWER AUTOMATE', category: 'curso' },
    { value: 'POWER APPS Y POWER AUTOMATE AVANZADO', label: 'POWER APPS Y POWER AUTOMATE AVANZADO', category: 'curso' },
    { value: 'ISO 45001: GESTIÓN DE SST', label: 'ISO 45001: GESTIÓN DE SST', category: 'curso' },
    { value: 'ISO 9001: GESTIÓN DE LA CALIDAD', label: 'ISO 9001: GESTIÓN DE LA CALIDAD', category: 'curso' },
    { value: 'ISO 14001: GESTIÓN AMBIENTAL', label: 'ISO 14001: GESTIÓN AMBIENTAL', category: 'curso' },
    { value: 'AUDITORÍA INTERNA', label: 'AUDITORÍA INTERNA', category: 'curso' },
    { value: 'MODELAMIENTO DE PROCESOS CON BIZAGI', label: 'MODELAMIENTO DE PROCESOS CON BIZAGI', category: 'curso' },
    { value: 'LEAN SIX SIGMA YELLOW BELT', label: 'LEAN SIX SIGMA YELLOW BELT', category: 'curso' },
    { value: 'LEAN MANUFACTURING', label: 'LEAN MANUFACTURING', category: 'curso' },
    { value: 'LEAN SIX SIGMA GREEN BELT', label: 'LEAN SIX SIGMA GREEN BELT', category: 'curso' },
    { value: 'MANTENIMIENTO PRODUCTIVO TOTAL', label: 'MANTENIMIENTO PRODUCTIVO TOTAL', category: 'curso' },
    { value: 'APPS SCRIPT', label: 'APPS SCRIPT', category: 'curso' },
    { value: 'SSOMA', label: 'SSOMA', category: 'curso' },
    { value: 'POWER APPS Y POWER AUTOMATE PRESENCIAL', label: 'POWER APPS Y POWER AUTOMATE PRESENCIAL', category: 'curso' },
    
    // Process Management Diplomados
    { value: 'DIPLOMADO EN GESTIÓN DE PROCESOS Y MEJORA CONTINUA', label: 'DIPLOMADO EN GESTIÓN DE PROCESOS Y MEJORA CONTINUA', category: 'diplomado' },
    { value: 'DIPLOMADO EN GERENCIA DE SISTEMAS INTEGRADOS DE GESTIÓN', label: 'DIPLOMADO EN GERENCIA DE SISTEMAS INTEGRADOS DE GESTIÓN', category: 'diplomado' },
    
    // Process Management Specializations & PEE
    { value: 'ESPECIALIZACIÓN EN TRINORMA', label: 'ESPECIALIZACIÓN EN TRINORMA', category: 'especializacion' },
    { value: 'ESPECIALIZACIÓN EN POWER APPS Y POWER AUTOMATE', label: 'ESPECIALIZACIÓN EN POWER APPS Y POWER AUTOMATE', category: 'especializacion' },
    { value: 'ESPECIALIZACIÓN EN LEAN SIX SIGMA: GREEN BELT EXPERT', label: 'ESPECIALIZACIÓN EN LEAN SIX SIGMA: GREEN BELT EXPERT', category: 'especializacion' },
    { value: 'ESPECIALIZACIÓN EN TPM', label: 'ESPECIALIZACIÓN EN TPM', category: 'especializacion' },
    { value: 'ANALISTA DE PROCESOS', label: 'ANALISTA DE PROCESOS', category: 'pee' },
    
    // Project Management Courses
    { value: 'MICROSOFT PROJECT: GESTIÓN DE PROYECTOS', label: 'MICROSOFT PROJECT: GESTIÓN DE PROYECTOS', category: 'curso' },
    { value: 'GESTIÓN DE PROYECTOS', label: 'GESTIÓN DE PROYECTOS', category: 'curso' },
    { value: 'GESTIÓN AVANZADA DE PROYECTOS', label: 'GESTIÓN AVANZADA DE PROYECTOS', category: 'curso' },
    { value: 'GESTIÓN FINANCIERA DE PROYECTOS', label: 'GESTIÓN FINANCIERA DE PROYECTOS', category: 'curso' },
    { value: 'GESTIÓN ÁGIL DE PROYECTOS', label: 'GESTIÓN ÁGIL DE PROYECTOS', category: 'curso' },
    { value: 'GESTIÓN DE PROYECTOS I', label: 'GESTIÓN DE PROYECTOS I', category: 'curso' },
    { value: 'GESTIÓN DE PROYECTOS II', label: 'GESTIÓN DE PROYECTOS II', category: 'curso' },
    { value: 'PMO: GESTIÓN DE PORTAFOLIO Y OFICINA DE PROYECTOS', label: 'PMO: GESTIÓN DE PORTAFOLIO Y OFICINA DE PROYECTOS', category: 'curso' },
    
    // Project Management Diplomados
    { value: 'DIPLOMADO EN GESTIÓN DE PROYECTOS', label: 'DIPLOMADO EN GESTIÓN DE PROYECTOS', category: 'diplomado' },
    
    // Project Management PEE & Specializations
    { value: 'ANALISTA DE PROYECTOS', label: 'ANALISTA DE PROYECTOS', category: 'pee' },
    { value: 'ESPECIALIZACIÓN EN GESTIÓN DE PROYECTOS', label: 'ESPECIALIZACIÓN EN GESTIÓN DE PROYECTOS', category: 'especializacion' },
    
    // Finance Courses
    { value: 'COSTOS Y PRESUPUESTOS', label: 'COSTOS Y PRESUPUESTOS', category: 'curso' },
    { value: 'CONTABILIDAD FINANCIERA CON ERP', label: 'CONTABILIDAD FINANCIERA CON ERP', category: 'curso' },
    { value: 'PLANEAMIENTO FINANCIERO', label: 'PLANEAMIENTO FINANCIERO', category: 'curso' },
    { value: 'PRICING Y RENTABILIDAD', label: 'PRICING Y RENTABILIDAD', category: 'curso' },
    
    // Finance Specializations & Diplomados
    { value: 'ESPECIALIZACIÓN EN FINANZAS APLICADAS', label: 'ESPECIALIZACIÓN EN FINANZAS APLICADAS', category: 'especializacion' },
    { value: 'DIPLOMADO EN GESTIÓN FINANCIERA', label: 'DIPLOMADO EN GESTIÓN FINANCIERA', category: 'diplomado' },
    
    // Other Courses
    { value: 'GESTIÓN DE COMERCIO INTERNACIONAL', label: 'GESTIÓN DE COMERCIO INTERNACIONAL', category: 'curso' },
    { value: 'PROGRAMACIÓN WEB', label: 'PROGRAMACIÓN WEB', category: 'curso' },
    { value: 'PROGRAMACIÓN JAVASCRIPT WEB', label: 'PROGRAMACIÓN JAVASCRIPT WEB', category: 'curso' },
    { value: 'REACT JS & REACT NATIVE', label: 'REACT JS & REACT NATIVE', category: 'curso' },
    { value: 'CIBERSEGURIDAD', label: 'CIBERSEGURIDAD', category: 'curso' },
    { value: 'ESPECIALIZACIÓN EN DESARROLLO FRONT END', label: 'ESPECIALIZACIÓN EN DESARROLLO FRONT END', category: 'especializacion' },
    { value: 'INTELIGENCIA ARTIFICIAL APLICADA AL MARKETING', label: 'INTELIGENCIA ARTIFICIAL APLICADA AL MARKETING', category: 'curso' },
    { value: 'ESTRATEGIAS Y TÉCNICAS COMERICALES', label: 'ESTRATEGIAS Y TÉCNICAS COMERICALES', category: 'curso' },
    { value: 'GESTIÓN DE CONTRATACIONES CON EL ESTADO', label: 'GESTIÓN DE CONTRATACIONES CON EL ESTADO', category: 'curso' },
    { value: 'AUTOCAD', label: 'AUTOCAD', category: 'curso' },
    { value: 'BIM MANAGEMEMT', label: 'BIM MANAGEMEMT', category: 'curso' },
    { value: 'UX/UI CON FIGMA', label: 'UX/UI CON FIGMA', category: 'curso' },
    { value: 'GESTIÓN ESTRATÉGICA Y NEGOCIACIÓN EFECTIVA', label: 'GESTIÓN ESTRATÉGICA Y NEGOCIACIÓN EFECTIVA', category: 'curso' },
    { value: 'EMPLEABILIDAD 4.0: PARA JÓVENES PROFESIONALES', label: 'EMPLEABILIDAD 4.0: PARA JÓVENES PROFESIONALES', category: 'curso' },
    { value: 'GESTIÓN DE EMPRESAS', label: 'GESTIÓN DE EMPRESAS', category: 'curso' },
    { value: 'IA GENERATIVA APLICADA A PROCESOS EMPRESARIALES', label: 'IA GENERATIVA APLICADA A PROCESOS EMPRESARIALES', category: 'curso' },
    { value: 'PLANIFICACIÓN MINERA', label: 'PLANIFICACIÓN MINERA', category: 'curso' },
    { value: 'RESPONSABILIDAD SOCIAL MINERA', label: 'RESPONSABILIDAD SOCIAL MINERA', category: 'curso' },
    { value: 'DIRECCIÓN ESTRATÉGICA DE AGRONEGOCIOS', label: 'DIRECCIÓN ESTRATÉGICA DE AGRONEGOCIOS', category: 'curso' },
    { value: 'GESTIÓN DE EMPRESAS AGROINDUSTRIALES', label: 'GESTIÓN DE EMPRESAS AGROINDUSTRIALES', category: 'curso' },
    { value: 'DIRECCIÓN COMERCIAL PARA AGRONEGOCIOS SOSTENIBLES', label: 'DIRECCIÓN COMERCIAL PARA AGRONEGOCIOS SOSTENIBLES', category: 'curso' }
  ]
}
const canNext = computed(() => currentStep.value < maxStep && sectionReady(currentStep.value))

/* --------------------
 * Validación / progreso
 * -------------------- */
const required = ['email','documento', 'born', 'apellidos', 'nombres', 'categoriaPrograma', 'programa',
  'carrera', 'universidad', 'gradoAcademico', 'situacionActual', 'programaEmprendimiento',
  'tallerSpeaking', 'pais', 'departamento', 'necesidadEspecial'
]
const requiredFilled = computed(() => required.filter(k => !!form[k]).length)
const requiredTotal = required.length
const isValid = computed(() => requiredFilled.value === requiredTotal)
const validPhone = computed(() => /^9\d{8}$/.test(form.celular || ''))

function touch(field){ touched[field] = true }
function vClass(field){ return touched[field] && !form[field] ? 'invalid' : '' }

const progressPct = computed(() => {
  const found = sections.find(s => s.step === currentStep.value)
  return found ? found.porcent : 0
})

/* --------------------
 * Lógica de perfil
 * -------------------- */
const isLaborando = computed(() => form.situacionActual === 'me encuentro laborando')

watch(() => form.situacionActual, (val) => {
  if(val !== 'me encuentro laborando'){
    // limpiar campos de trabajo si no labura
    form.areaActual = null
    form.areaDeseada = null
    form.empresa = ''
    form.puesto = ''
    form.aniosExp = null
    form.sector = null
  }
})

/* --------------------
 * Navegación por pasos
 * -------------------- */
function goTo(n){ if(n >= minStep && n <= maxStep) currentStep.value = n }
function prev(){ if(currentStep.value > minStep) currentStep.value-- }

function stepClass(n){
  return {
    active: currentStep.value === n,
    done: n < currentStep.value
  }
}

function sectionReachable(n){
  // Permite ir hacia atrás siempre; hacia adelante solo si los anteriores están "listos"
  if(n <= currentStep.value) return true
  // Valida requisitos mínimos por paso
  for(let i = minStep; i < n; i++){
    if(!sectionReady(i)) return false
  }
  return true
}
function sectionReady(n){
  // 1 Bienvenida: siempre
  if(n === 1) return true
  // 2 Contacto: todo lo requerido + teléfono válido
  if(n === 2) return ['email','born','documento','apellidos','nombres'].every(k => !!form[k]) 
  // 3 Programa
  if(n === 3) return !!form.categoriaPrograma && !!form.programa
  // 4 Perfil: opcional (si elige "Otra", no es obligatorio completar el texto)
  if(n === 4){
    if(!!form.situacionActual && !!form.gradoAcademico && !!form.universidad && !!form.carrera && !!form.pais && !!form.departamento){
      if(isLaborando.value){
        return ['areaActual','areaDeseada','empresa','puesto','aniosExp','sector'].every(k => !!form[k])
      }
      return true
    }
    return false
  } 
  // 5 Accesibilidad
  if(n === 5) return !!form.necesidadEspecial && (form.necesidadEspecial !== 'otro' || !!form.necesidadEspecialOtra)
  // 6 Identidad (opcional)
  if(n === 6) return !!files.front && !!files.back
  // 7 Despedida (final)
  if(n === 7) return true
  return false
}

/* --------------------
 * UX helpers
 * -------------------- */
function maskPhone(){ form.celular = (form.celular || '').replace(/\D/g,'').slice(0,9) }
function showToast(msg){ toast.value = msg; setTimeout(()=> toast.value = '', 2400) }

/* --------------------
 * Archivos + previews
 * -------------------- */
function onFile(e, side){
  const file = e.target.files?.[0]
  touchedFiles[side] = true                // ✅ marcar como tocado
  files[side] = file || null
  if(file){
    const reader = new FileReader()
    reader.onload = ev => { previews[side] = String(ev.target?.result || '') }
    reader.readAsDataURL(file)
  } else {
    previews[side] = ''
  }
}

/* --------------------
 * Autosave (localStorage)
 * -------------------- */
const STORAGE_KEY = 'weee_form_v2'

watch(form, (val)=>{
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  autosaveState.value = 'borrador guardado'
}, { deep: true })

onMounted(()=>{
  const raw = localStorage.getItem(STORAGE_KEY)
  if(raw){
    try { Object.assign(form, JSON.parse(raw)) } catch(e){}
  }
  autosaveState.value = 'activo'
})

/* --------------------
 * Submit (demo)
 * -------------------- */
let allowAutosave = true
watch(form, (val) => {
  if (!allowAutosave) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  autosaveState.value = 'borrador guardado'
}, { deep: true })


function resetForm () {
  allowAutosave = false
  // limpiar reactividad del form
  Object.assign(form, defaultForm)

  // archivos y vistas previas
  files.front = null
  files.back  = null
  previews.front = ''
  previews.back  = ''

  // limpiar inputs file nativos
  if (dniFront.value) dniFront.value.value = ''
  if (dniBack.value)  dniBack.value.value  = ''

  // limpiar “touched” y validaciones
  for (const k in touched) delete touched[k]
  touchedFiles.front = false
  touchedFiles.back  = false

  // limpiar borrador
  localStorage.removeItem(STORAGE_KEY)
  autosaveState.value = 'inactivo'

  // volver al inicio y barra de progreso
  currentStep.value = minStep
  window.scrollTo({ top: 0, behavior: 'smooth' })
  setTimeout(() => { allowAutosave = true; autosaveState.value = 'activo' }, 200)
}

async function uploadDirect(side){
  const f = files[side]
  if (!f) return { key: '', url: '' }

  const sign = await fetch('http://38.242.140.200:3000/upload/sign', {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ contentType: f.type, side })
  }).then(r => r.json())

  await fetch(sign.uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': f.type,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'x-goog-meta-side': side
    },
    body: f
  })

  // Devolvemos ambas cosas
  return { key: sign.key, url: sign.publicUrl }
}


async function submit(){
  if (!files.front || !files.back) {
    touchedFiles.front = true
    touchedFiles.back  = true
    showToast('Por favor, adjunta ambas caras del DNI antes de enviar.')
    return
  }

  try {
    isSubmitting.value = true

    const front = await uploadDirect('front')
    const back  = await uploadDirect('back')

    const payload = {
      ...form,
      archivos: {
        dni_front_key: front.key,
        dni_back_key:  back.key,
        dni_front_url: front.url,   // opcional (útil si algún día haces público el bucket)
        dni_back_url:  back.url
      }
    }

    const res = await fetch('http://38.242.140.200:3000/inscripcion', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error('Fallo al registrar')

    showSuccess.value = true     // mostramos modal
  } catch (e) {
    console.error(e)
    showToast('⚠️ Ocurrió un problema al enviar. Intenta de nuevo.')
  } finally {
    isSubmitting.value = false
  }
}

  const programList = ref([])

  function onChangeCategory(opcion) {
    form.programa = null
    programList.value = catalogo.programs.filter(p => p.category === opcion.value)
    
  }
    


</script>

<style scoped>
/* ====== Layout ====== */
.page { display: grid; gap: 16px; padding: 16px; }
.grid { display: grid; grid-template-columns: 1fr; gap: 16px; align-items: start; }
.grid.no-preview { grid-template-columns: 1fr; }
@media (max-width: 1100px){ .grid { grid-template-columns: 1fr; } }

/* ====== Topbar ====== */
.topbar{ display:flex; align-items:center; justify-content:space-between; gap:12px; padding:12px 16px; border-radius:16px; background:linear-gradient(135deg,#eef2ff,#f5f3ff); border:1px solid #e5e7eb; box-shadow: 0 6px 20px rgba(0,0,0,.04); }
.brand{ display:flex; align-items:center; gap:12px; }
.brand-title{ font-weight:700; letter-spacing:.2px; }
.brand-sub{ font-size:.8rem; color:#6b7280; }
.actions{ display:flex; gap:8px; }

/* ====== Buttons ====== */
.btn{ appearance:none; border:1px solid #1f2937; background:#111827; color:#fff; padding:8px 12px; border-radius:10px; font-weight:600; box-shadow:0 2px 0 #0b0f17; transition: transform .05s ease, box-shadow .2s ease, background .2s; }
.btn:hover{ transform: translateY(-1px); box-shadow:0 5px 14px rgba(0,0,0,.15); }
.btn:disabled{ opacity:.6; cursor:not-allowed; }
.btn.primary{ background:#3b82f6; border-color:#2563eb; box-shadow:0 2px 0 #1d4ed8; }
.btn.ghost{ background:#fff; color:#111827; border-color:#e5e7eb; box-shadow:none; }

/* ====== Progress / Stepper ====== */
.progress-wrap{ display:grid; gap:8px; }
.progress{ height:8px; background:#eef2ff; border-radius:9999px; overflow:hidden; border:1px solid #e5e7eb; }
.bar{ height:100%; background:linear-gradient(90deg,#3b82f6,#8b5cf6); width:0; transition: width .4s ease; }
.stepper{ display:flex; flex-wrap:wrap; gap:6px; }
.step{ display:flex; align-items:center; gap:8px; padding:6px 10px; border-radius:9999px; border:1px solid #e5e7eb; background:#fff; font-weight:600; color:#374151; }
.step .idx{ display:inline-grid; place-items:center; width:22px; height:22px; border-radius:9999px; background:#f3f4f6; font-size:.8rem; font-weight:700; }
.step.active{ border-color:#3b82f6; color:#1f2937; }
.step.done{ background:linear-gradient(180deg,#f8fafc,#ffffff); }
.step:disabled{ opacity:.5 }

/* ====== Cards ====== */
.card{ background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:16px; box-shadow:0 8px 24px rgba(0,0,0,.05); }
.form-card{ overflow:visible; }

/* ====== Form ====== */
.form-section{ display:grid; gap:14px; }
.form-section h3{ margin:0; font-size:1rem; text-transform:uppercase; letter-spacing:.06em; color:#111827; position:relative; padding-left:10px; }
.form-section h3:before{ content:''; position:absolute; left:0; top:3px; bottom:3px; width:3px; background:#3b82f6; border-radius:3px; }
.row{ display:flex; flex-wrap:wrap; margin:-8px; }
.col-12{ width:100%; padding:8px; }
.col-8{ width:66.6666%; padding:8px; }
.col-6{ width:50%; padding:8px; }
.col-4{ width:33.3333%; padding:8px; }
.col-3{ width:25%; padding:8px; }
.col-2{ width:16.6666%; padding:8px; }
@media (max-width: 900px){ .col-8,.col-6,.col-4,.col-3,.col-2{ width:100%; } }

.field{ display:grid; gap:6px; min-height: 96px; }
label{ font-size:.85rem; color:#111827; font-weight:600; }
.req{ color:#ef4444; }
input, select{ border:1px solid #e5e7eb; border-radius:10px; padding:10px 12px; font-size:.95rem; outline:none; transition: box-shadow .15s ease, border .15s ease; }
input:focus, select:focus{ border-color:#93c5fd; box-shadow:0 0 0 4px rgba(59,130,246,.12); }
.invalid{ border-color:#f87171 !important; box-shadow:0 0 0 4px rgba(248,113,113,.12) !important; }
.err{ color:#ef4444; font-size:.8rem; }
.muted{ color:#6b7280; font-size:.9rem; }

/* Step nav */
.step-nav{ display:flex; justify-content:space-between; margin-top:8px; }

/* Thumbnails */
.thumb{ margin-top:8px; border:1px solid #e5e7eb; border-radius:10px; padding:6px; width:100%; max-width:240px; background:#fafafa }
.thumb img{ width:100%; border-radius:8px; display:block; }

/* Animations */
.fade-slide-enter-active,.fade-slide-leave-active{ transition: all .24s ease; }
.fade-slide-enter-from{ opacity:0; transform: translateY(8px); }
.fade-slide-leave-to{ opacity:0; transform: translateY(-8px); }
.toast-enter-active,.toast-leave-active{ transition: opacity .25s ease, transform .25s ease; }
.toast-enter-from,.toast-leave-to{ opacity:0; transform: translateY(8px); }
.toast{ position:fixed; right:16px; bottom:16px; background:#111827; color:#fff; padding:10px 14px; border-radius:12px; box-shadow:0 10px 24px rgba(0,0,0,.16); z-index:20 }
/* Subtítulo interno de secciones (para “Experiencia Laboral”) */
.form-section-subtitle {
  margin-top: 6px;
  margin-bottom: 4px;
  padding: 10px 12px;
  border-radius: 10px;
  background: linear-gradient(180deg,#f9fafb,#ffffff);
  border: 1px solid #e5e7eb;
}

.form-section-subtitle h4 {
  margin: 0 0 4px;
  font-size: .95rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: .02em;
}

.form-section-subtitle + .row {
  margin-top: 6px;
}
/* Mensaje de ayuda: oculto por defecto */
.assist{
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  font-size: .8rem;
  color: #6b7280;
  transition: opacity .2s ease, max-height .2s ease;
}

/* Cuando el campo tiene foco en cualquier hijo (input interno del SearchSelect), mostrar */
.field:focus-within .assist{
  opacity: 1;
  max-height: 40px; /* suficiente para una línea */
}

/* Si ya eligió "otra", mantenlo visible */
.assist--persist{
  opacity: 1 !important;
  max-height: 40px !important;
}
.modal-backdrop{
  position: fixed; inset: 0;
  background: rgba(17,24,39,.5);
  display: grid; place-items: center;
  z-index: 50;
  padding: 16px;
}
.modal-card{
  width: 100%; max-width: 480px;
  background: #fff; border: 1px solid #e5e7eb;
  border-radius: 16px; padding: 20px;
  text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,.15);
}
.modal-icon{ font-size: 40px; margin-bottom: 6px; }
.modal-title{ margin: 0 0 6px; font-size: 1.15rem; }
.modal-text{ margin: 0 0 14px; color:#6b7280; }

</style>
